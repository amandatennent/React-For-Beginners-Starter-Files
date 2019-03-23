import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

/* eslint-disable react/prefer-stateless-function */
class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
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
