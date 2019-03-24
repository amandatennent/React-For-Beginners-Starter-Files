/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    static propTypes = {
        match: PropTypes.object,
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeID);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${this.props.match.params.storeID}/fishes`, {
            context: this,
            state: 'fishes',
        });
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeID,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishesObject = this.state.fishes; // Take a copy of the existing state
        const fishes = { ...fishesObject };
        fishes[`fish${Date.now()}`] = fish; // Add our new fish to the fishes variable
        this.setState({ fishes }); // Set the new fishes object to state
    };

    updateFish = (key, updatedFish) => {
        const fishesObject = this.state.fishes; // Take a cope of the existing state
        const fishes = { ...fishesObject };
        fishes[key] = updatedFish; // Update the state
        this.setState({ fishes }); // Set the new state
    };

    deleteFish = key => {
        const fishesObject = this.state.fishes; // Take a copy of state
        const fishes = { ...fishesObject };
        fishes[key] = null; // Set the fish we want to delete to null so firebase deletes it.
        this.setState({ fishes }); // Update the state
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = key => {
        const orderObject = this.state.order; // Take a copy of state
        const order = { ...orderObject };
        order[key] = order[key] + 1 || 1; // Either add to the order, or update the number in the order
        this.setState({ order }); // Call set state to update state object
    };

    removeFromOrder = key => {
        const orderObject = this.state.order; // Take a copy of state
        const order = { ...orderObject };
        delete order[key]; // Delete them item
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    deleteFish={this.deleteFish}
                    storeID={this.props.match.params.storeID}
                />
            </div>
        );
    }
}

export default App;
