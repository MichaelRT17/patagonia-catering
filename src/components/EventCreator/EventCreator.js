import React, { Component } from 'react';
import './EventCreator.css';
import Icon from '@material-ui/core/Icon';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { getTotal } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EventCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            eventName: '',
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
                    cartItems: items
                })
            })
    }

    handleCreateEvent() {
        axios.post('/api/createEvent', {
            eventName: this.state.eventName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }).then((res) => {
            let event_id = res.data
            axios.post(`/api/addToEventCart/`)
                .then((res) => {
                    console.log(res.data)
                    res.data.forEach(id => {
                        axios.put(`/api/linkToEvent/${id.event_cart_entry_id}`, {
                            event_id: event_id
                        }).then(() => {
                            axios.delete('/api/removeFromCart')
                        })
                    })
                })
        })
    }

    render() {
        let total = 0;
        console.log(this.state)
        let mappedItems = this.state.cartItems.map((item, i) => {
            total += item.amount * item.product_price;
            return (
                <div key={i} className='button-hold outline'>
                    <h6 className='text-desc-product'>{item.product_name}</h6>
                    <div className='product-box'>
                        <h6 className='text-desc-product'>{item.amount} x ${item.product_price}</h6>
                        <h6 className='text-desc-product'>= ${item.amount * item.product_price}.00</h6>
                    </div>
                </div>
            )
        })
        return (
            <div className='App'>
                <span >
                    <h2 className='title' >Your Event Info:</h2>
                    <h5 className='text-desc'>Event Name:</h5>
                    <input type='' className='' style={{ width: '100px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                        onChange={e => this.setState({ eventName: e.target.value })} value={this.state.eventName} />
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
                </span>
                <br />
                <br />
                <div className='button-hold' style={{ margin: '5px 0' }}>
                    <Link to='/cart' >
                        <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                            clear
                    </Icon >
                    </Link >
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
                                <br />
                                {mappedItems}
                                <h5>Total: ${total}.00</h5>
                                <div className='button-holder' style={{ margin: '5px 0' }}>
                                    <Icon style={{ fontSize: '40px', color: '#F6B506' }} onClick={close}>
                                        clear
                                            </Icon >
                                    <Link to={`/yourEvents/${this.props.user.user_id}`} >
                                        <Icon style={{ fontSize: '40px', color: '#F6B506' }}
                                            onClick={() => this.handleCreateEvent()}>
                                            done
                                            </Icon >
                                    </Link>
                                </div>
                            </span>
                        )}
                    </Popup>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        total: state.total,
        user: state.user
    }
}

export default connect(mapStateToProps, { getTotal })(EventCreator);