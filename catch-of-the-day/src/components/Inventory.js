/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* TODO: Link accounts when a user with the same email address signs in using a different provider */

import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async authData => {
        // 1: Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeID, { context: this });
        // 2: Claim it if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeID}/owner`, {
                data: authData.user.uid,
            });
        }

        // 3: Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
        });
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
            .catch(function catchThisError(error) {
                if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                )
                    alert(
                        'You have already signed up using a different method, please use that instead'
                    );
            });
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = (
            <button type="button" onClick={this.logout}>
                Log Out
            </button>
        );

        // Check if the user is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // Check if the user is the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner</p>
                    {logout}
                </div>
            );
        }

        // OBVIOUSLY, they're the owner, so give them the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button type="submit" onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        );
    }
}

export default Inventory;
