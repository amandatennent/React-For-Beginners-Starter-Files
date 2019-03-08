import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
	state = {
		fishes: {},
		order: {},
	};

	addFish = fish => {
		const fishesObject = this.state.fishes; // Take a copy of the existing state
		const fishes = { ...fishesObject };
		fishes[`fish${Date.now()}`] = fish; // Add our new fish to the fishes variable
		this.setState({ fishes }); // Set the new fishes object to state
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = (key) => {
		const orderObject = this.state.order; // Take a copy of state
		const order = { ...orderObject };
		order[key] = order[key] + 1 || 1; // Either add to the order, or update the number in the order
		this.setState({ order }); // Call set state to update state object
	}

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
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
			</div>
		);
	}
}

export default App;
