import React, {Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            newQuantity: 0,
            cartFull: false
        }
    }

    componentDidMount() {
        let items = [];
        axios.get('/api/getCartItems')
            .then(res => {
                res.data.forEach(item => {
                    let x = items.findIndex(e => e.product_id === item.product_id )
                    x === -1 ? items.push(item) : items[x].amount += item.amount
                })
                this.setState({
                    cartItems: items
                })
            }
            )
    }

    render() {
        console.log(this.state.cartItems)
        let mappedItems = this.state.cartItems.map( item => {
            return (
                <div key={item.cart_entry_id} className='box-holder'>
                    <div className='divide-boxes-image'>
                        <h5 className='text-desc'>{item.product_name}</h5>
                        <img width='75px' src={item.product_img} alt=''/>
                    </div>
                    <h5 className='text-desc'>|</h5>
                    <div className='divide-boxes-info'>
                        <h5 className='text-desc'>Quantity per unit: {item.quantity} x {item.amount} = {item.amount*item.quantity}</h5>
                        <h5 className='text-desc'>Cost per unit: ${item.product_price} x {item.amount} = ${item.product_price*item.amount}.00</h5>
                        <div className='button-holder'>
                            <h5 className='text-desc'>Update unit amount: </h5>
                            <input placeholder={item.amount} style={{ width: '30px', height: '15px', border:'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({newQuantity: e.target.value})}/>
                            <Icon >
                                done
                            </Icon >
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <h2 style={{color: '#555555'}}>Your Cart:</h2>
                {mappedItems}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id
    }
}

export default connect(mapStateToProps)(Cart);

