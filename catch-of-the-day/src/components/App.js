/* eslint-disable react/no-unused-state */
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

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish key={key} details={this.state.fishes[key]}>{key}</Fish>
						))}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
			</div>
		);
	}
}

export default App;
