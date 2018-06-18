import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Popup from 'reactjs-popup';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            newQuantity: 0,
            cartFull: false,
            update: false,

            address: '',
            city: '',
            state: '',
            zipcode: '',
            date: '',
            startTime: '',
            endTime: ''
        }
    }

    componentDidMount() {
        let items = [];
        axios.get('/api/getCartItems')
            .then(res => {
                res.data.forEach(item => {
                    let x = items.findIndex(e => e.product_id === item.product_id)
                    x === -1 ? items.push(item) : items[x].amount += item.amount
                })
                this.setState({
                    cartItems: items,
                    cartFull: true
                })
                if (this.state.cartItems.length === 0) {
                    this.setState({
                        cartFull: false
                    })
                }
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update !== prevState.update) {
            this.componentDidMount()
        }
    }

    handleUpdate(user_id, product_id, newAmount) {
        axios.post(`/api/updateAmount/`, {
            user_id: user_id,
            product_id: product_id,
            amount: newAmount
        }).then(() => {
            // alert('Cart updated successfully!')
            this.setState({
                update: !this.state.update
            })
        })
    }

    handleDelete(product_id) {
        axios.delete(`/api/removeProduct/${product_id}`)
            .then(() => {
                this.setState({
                    update: !this.state.update
                })
            })
    }

    handleCheckOut() {
        axios.delete('/api/checkout')
            .then(() => {
                this.setState({
                    update: !this.state.update
                })
            })
    }

    render() {
        console.log(this.state)
        let total = 0;
        let mappedItems = this.state.cartItems.map(item => {
            total += item.amount * item.product_price;
            if (item.amount !== 0) {
                return (
                    <div key={item.cart_entry_id} className='box-holder'>
                        <div className='divide-boxes-image'>
                            <h5 className='text-desc'>{item.product_name}</h5>
                            <img width='75px' src={item.product_img} alt='' />
                            <Icon onClick={() => this.handleDelete(item.product_id)}>
                                delete_forever
                                </Icon >
                        </div>
                        <h5 className='text-desc'>|</h5>
                        <div className='divide-boxes-info'>
                            <h5 className='text-desc'>Quantity per unit: {item.quantity} x {item.amount} = {item.amount * item.quantity}</h5>
                            <h5 className='text-desc'>Cost per unit: ${item.product_price} x {item.amount} = ${item.product_price * item.amount}.00</h5>
                            <div className='button-holder'>
                                <h5 className='text-desc'>Update unit amount: </h5>
                                <input placeholder={item.amount} style={{ width: '30px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }} type='number'
                                    onChange={e => this.setState({ newQuantity: e.target.value - item.amount })} />
                                <Icon onClick={() => this.handleUpdate(this.props.user_id, item.product_id, this.state.newQuantity)}>
                                    done
                            </Icon >
                            </div>
                        </div>
                    </div>
                )
            } else {
                return false
            }
        })
        return (
            <div>
                <h2 style={{ color: '#555555' }}>Your Cart:</h2>
                {mappedItems}
                <h4 className={this.state.cartFull ? 'full-cart' : 'empty-cart'}>There are no items in your cart!</h4>
                <br />
                <h4 className={this.state.cartFull ? 'full-cart' : 'empty-cart'}>Please login to see items added previously.</h4>
                <h4 className={this.state.cartFull ? 'text-desc' : 'full-cart'}>Total: ${total}.00</h4>
                <Popup
                    trigger={
                        <Icon style={{ color: '#F6B506', fontSize: 40 }} className={this.state.cartFull ? 'text-desc' : 'full-cart'}
                            onClick={() => this.handleCheckOut()}>
                            check_circle
                        </Icon >
                    }
                    modal
                >
                    {close => (
                        <span className='' >
                            <h3 className='empty-cart' >Your Event Info:</h3>
                            <h5 className='text-desc'>Address:</h5>
                            <input type='' className='' style={{ width: '150px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ address: e.target.value })} value={this.state.address} />
                            <h5 className='text-desc'>City:</h5>
                            <input type='' className='' style={{ width: '80px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ city: e.target.value })} value={this.state.city} />
                            <h5 className='text-desc'>State:</h5>
                            <select style={{ width: '50px', height: '17px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ state: e.target.value })} value={this.state.state}>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AZ">AZ</option>
                                <option value="AR">AR</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="DC">DC</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="IA">IA</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="ME">ME</option>
                                <option value="MD">MD</option>
                                <option value="MA">MA</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MS">MS</option>
                                <option value="MO">MO</option>
                                <option value="MT">MT</option>
                                <option value="NE">NE</option>
                                <option value="NV">NV</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NY">NY</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VT">VT</option>
                                <option value="VA">VA</option>
                                <option value="WA">WA</option>
                                <option value="WV">WV</option>
                                <option value="WI">WI</option>
                                <option value="WY">WY</option>
                            </select>
                            <h5 className='text-desc'>Zipcode:</h5>
                            <input type='number' className='' style={{ width: '80px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ zipcode: e.target.value })} value={this.state.zipcode} />
                            <h5 className='text-desc'>Date of Event:</h5>
                            <input type='date' className='' style={{ width: '150px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ date: e.target.value })} value={this.state.date} />
                            <h5 className='text-desc'>Start Time:</h5>
                            <input type='time' className='' style={{ width: '120px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ startTime: e.target.value })} value={this.state.startTime} />
                            <h5 className='text-desc'>End Time:</h5>
                            <input type='time' className='' style={{ width: '120px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                                onChange={e => this.setState({ endTime: e.target.value })} value={this.state.endTime} />
                            <div className='button-holder' style={{ margin: '5px 0' }}>
                                <Icon style={{ fontSize: '40px', color: '#F6B506' }} onClick={close}>
                                    clear
                            </Icon >
                                <Popup
                                    trigger={
                                        <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                                            done
                                        </Icon >
                                    }
                                    position="top center"
                                    closeOnDocumentClick
                                >
                                {close => (
                                    <span>
                                        <h4>Does this look correct?</h4>
                                        <h6 style={{ margin: '0 0 5px 0' }}>Address: {this.state.address}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>City: {this.state.city}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>State: {this.state.state}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>Zipcode: {this.state.zipcode}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>Date: {this.state.date}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>Start Time: {this.state.startTime}</h6>
                                        <h6 style={{ margin: '0 0 5px 0' }}>End Time: {this.state.endTime}</h6>
                                        <h5>Total: ${total}.00</h5>
                                        <div className='button-holder' style={{ margin: '5px 0' }}>
                                            <Icon style={{ fontSize: '40px', color: '#F6B506' }} onClick={close}>
                                                clear
                                            </Icon >
                                            {/* <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                                                done
                                            </Icon > */}
                                        </div>
                                    </span>
                                )}
                                </Popup>

                            </div>
                        </span>
                    )}
                </Popup>
                <h3 className={this.state.cartFull ? 'text-desc' : 'full-cart'}>Create Event and Checkout</h3>
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

