import React, { Component } from 'react';
import './Product.css'

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0
        }
    }



    render() {
        console.log(this.state.quantity)
        return (
            <div>
                <h3>{this.props.product.product_name}</h3>
                <img width='300px' src={this.props.product.product_img} alt='food' />
                <div className='info-box'>
                    <h5>Price: ${this.props.product.product_price}</h5>
                    <p> </p>
                    <h5>Feeds: {this.props.product.feeds} people</h5>
                    <p> </p>
                    <h5>Quantity: {this.props.product.quantity}</h5>
                </div>
                <p className='food-desc'>{this.props.product.product_desc}</p>
                <div>
                    <input type="number" min='1' placeholder='1' style={{width:'30px'}}
                        onChange={e => this.setState({ quantity: e.target.value })} />
                </div>
            </div>
        )
    }
}