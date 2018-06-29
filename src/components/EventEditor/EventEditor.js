import React, { Component } from 'react';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './EventEditor.css';

export default class EventEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            paidDisplay: false,
            eventName: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            date: '',
            startTime: '',
            endTime: '',
            paid: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/getEvent/${this.props.match.params.event_id}`)
            .then(res => {
                if (res.data === 'redirect') {
                    this.props.history.push('/')
                } else {
                    this.setState({
                        eventName: res.data[0].event_name,
                        address: res.data[0].address,
                        city: res.data[0].city,
                        state: res.data[0].state,
                        zipcode: res.data[0].zipcode,
                        date: res.data[0].date,
                        startTime: res.data[0].start_time,
                        endTime: res.data[0].end_time,
                        paid: res.data[0].paid,
                        items: res.data
                    })
                    if (this.state.paid === 'PAID') {
                        this.setState({
                            paidDisplay: true
                        })
                    }
                }
            })
    }

    updateEvent() {
        axios.put(`/api/updateEvent/${this.props.match.params.event_id}`, {
            eventName: this.state.eventName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        })
    }

    render() {
        let total = 0;
        let mappedItems = this.state.items.map((item, i) => {
            total += item.amount * item.product_price;
            return (
                <div key={i} className='button-hold outline'>
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
            <div>
                <div className='text-color'>
                    <h3 style={{ margin: '15px 0 5px 0' }}>Event Name: </h3>
                    <input type='' className='' onChange={e => this.setState({ eventName: e.target.value })} value={this.state.eventName}
                        style={{ width: '100px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>Address: </h4>
                    <input type='' className='' onChange={e => this.setState({ address: e.target.value })} value={this.state.address}
                        style={{ width: '150px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>City: </h4>
                    <input type='' className='' onChange={e => this.setState({ city: e.target.value })} value={this.state.city}
                        style={{ width: '80px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>State: </h4>
                    <select style={{ width: '50px', height: '17px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555', backgroundColor: 'white' }}
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
                    <h4 style={{ margin: '5px 0 5px 0' }}>Zipcode: </h4>
                    <input type='' className='' onChange={e => this.setState({ zipcode: e.target.value })} value={this.state.zipcode}
                        style={{ width: '80px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>Date: </h4>
                    <input type='date' className='' onChange={e => this.setState({ date: e.target.value })} value={this.state.date}
                        style={{ width: '150px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', backgroundColor: 'white', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>Start Time: </h4>
                    <input type='time' className='' onChange={e => this.setState({ startTime: e.target.value })} value={this.state.startTime}
                        style={{ width: '120px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', backgroundColor: 'white', color: '#555555' }} />
                    <h4 style={{ margin: '5px 0 5px 0' }}>End Time: </h4>
                    <input type='time' className='' onChange={e => this.setState({ endTime: e.target.value })} value={this.state.endTime}
                        style={{ width: '120px', height: '15px', border: 'solid 1px #555555', textAlign: 'center', backgroundColor: 'white', color: '#555555' }} />
                    <br />
                    <br />
                    {mappedItems}
                    <h5 className='total-display'>Total: ${total}.00</h5>
                    <br />
                    <h4 className={this.state.paidDisplay ? 'show-button' : 'hide-button'}>EVENT PAID IN FULL</h4>
                    <div className='button-holder' style={{ margin: '5px auto' }}>
                        <Link to={`/yourEvents/${this.props.match.params.user_id}`}>
                            <Icon style={{ fontSize: '40px', color: '#F6B506' }} >
                                clear
                    </Icon >
                        </Link >
                        <Link to={`/event/${this.props.match.params.user_id}/${this.props.match.params.event_id}`} >
                            <Icon style={{ fontSize: '40px', color: '#F6B506' }} onClick={() => this.updateEvent()}>
                                done
                    </Icon >
                        </Link >
                    </div>
                </div>
            </div>
        )
    }
}