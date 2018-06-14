import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { connect } from 'react-redux';
import './Product.css';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0
        }
    }

    handleAddToCart() {
        axios.post('/api/addToCart', {
            product_id: this.props.product.product_id,
            amount: this.state.quantity,
            user_id: this.props.user_id
        }).then(() => alert('Added to cart successfully!'))
    }

    render() {
        console.log(this.state.quantity)
        return (
            <div className='info-border'>
                <h3 className='info-text'>{this.props.product.product_name}</h3>
                <img width='300px' src={this.props.product.product_img} alt='food' />
                <div className='info-box'>
                    <h5 className='info-text'>Price: ${this.props.product.product_price}</h5>
                    <p> </p>
                    <h5 className='info-text'>Feeds: {this.props.product.feeds} people</h5>
                    <p> </p>
                    <h5 className='info-text'>Quantity: {this.props.product.quantity}</h5>
                </div>
                <p className='food-desc info-text'>{this.props.product.product_desc}</p>
                <div className='add-to-cart'>
                    <h4 className='info-text'>How many do you need?</h4>
                    <input type="number" min='1' placeholder='0' style={{ width: '30px', height: '15px', border:'solid 1px #555555', textAlign: 'center' }}
                        onChange={e => this.setState({ quantity: e.target.value })} />
                    <Icon style={{color:'#555555'}} onClick={() => this.handleAddToCart()}>
                        add_shopping_cart
                    </Icon>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id
    }
}

export default connect(mapStateToProps)(Product)

