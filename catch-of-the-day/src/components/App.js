import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

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

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory addFish={this.addFish} />
			</div>
		);
	}
}

export default App;
