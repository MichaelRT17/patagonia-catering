import React, { Component } from 'react';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';
import './Event.css';

export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: [],
            items: [],
            paid: false
        }
    }

    componentDidMount() {
        axios.get(`/api/getEvent/${this.props.match.params.event_id}`)
            .then(res => {
                this.setState({
                    event: res.data[0],
                    items: res.data
                })
                if(this.state.event.paid === 'PAID') {
                    this.setState({
                        paid: true
                    })
                }
            })
    }

    onPurchaseConfirmation() {
        axios.put('/api/updatePaid/' + this.props.match.params.event_id)
            .then(res => {
                this.setState({
                    paid: true
                })
            })
    }

    onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', { token, amount: 100 })
            .then(res => {
                this.onPurchaseConfirmation();
            })
    }

    render() {
        console.log(this.state)
        let total = 0;
        let mappedItems = this.state.items.map((item, i) => {
            total += item.amount * item.product_price;
            return (
                <div key={i} className='button-holds outline'>
                    <img width='40px' src={item.product_img} alt='' />
                    <h5 className='text-desc-product'>{item.product_name}</h5>
                    <div className='product-box'>
                        <h5 className='text-desc-product'>{item.amount} x ${item.product_price}</h5>
                        <h5 className='text-desc-product'>= ${item.amount * item.product_price}.00</h5>
                    </div>
                </div>
            )
        })
        return (
            <div className='text-color'>
                <h1>{this.state.event.event_name}</h1>
                <h4 style={{ margin: '0 0 5px 0' }}>Address: {this.state.event.address}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>City: {this.state.event.city}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>State: {this.state.event.state}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>Zipcode: {this.state.event.zipcode}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>Date: {this.state.event.date}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>Start Time: {this.state.event.start_time}</h4>
                <h4 style={{ margin: '0 0 5px 0' }}>End Time: {this.state.event.end_time}</h4>
                <br />
                {mappedItems}
                <h5 className='total-display'>Total: ${total}.00</h5>
                <br />
                <div className={this.state.paid ? 'hide-button' : 'show-button'}>
                    <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                        shopping_basket
                    </Icon >
                    <br />
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={'pk_test_qbmPhdNVmiUmOFLzGKXm58NP'}
                        amount={total * 100}
                    />
                </div>
                <h4 className={this.state.paid ? 'show-button' : 'hide-button'}>EVENT PAID IN FULL</h4>
                <br />
                <Link to={`/yourEvents/${this.props.match.params.user_id}`}>
                <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                    arrow_back
                    </Icon >
                    </Link >
            </div>
        )
    }
}