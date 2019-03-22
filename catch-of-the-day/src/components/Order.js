import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === 'available';
		const transitionOptions = {
			classNames: 'order',
			key,
			timeout: { enter: 500, exit: 500 },
		};

		if (!fish) return null; // Make sure fish objects are loaded before we display the order

		if (!isAvailable) {
			return (
				<CSSTransition {...transitionOptions}>
					<li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
				</CSSTransition>
			);
		}

		return (
			<CSSTransition {...transitionOptions}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {fish.name}
						{formatPrice(count * fish.price)}
						<button type="button" onClick={() => this.props.removeFromOrder(key)}>
							&times;
						</button>
					</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((tally, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === 'available';
			if (isAvailable) {
				return tally + count * fish.price;
			}
			return tally;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
