import React, {Component } from 'react';

export default class Product extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.product.product_name}</h3>
                <img width='300px' src={this.props.product.product_img} alt='food'/>
                <h4>Price: ${this.props.product.product_price}</h4>
                <h4>Quantity: {this.props.product.quantity}</h4>
                <h4>Feeds: {this.props.product.feeds} people</h4>
                <p>{this.props.product.product_desc}</p>
            </div> 
        )
    }
}