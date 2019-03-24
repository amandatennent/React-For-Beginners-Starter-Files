/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            index: PropTypes.string,
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        addToOrder: PropTypes.func,
    }

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    render() {
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';
        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {this.props.addToOrder(this.props.index);}}
                >
                    {isAvailable ? 'Add To Order' : 'Sold Out!'}
                </button>
            </li>
        );
    }
}

export default Fish;
