import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './YourEvents.css';

export default class YourEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourEvents: []
        }
    }

    componentDidMount() {
        axios.get(`/api/getUserEvents/${this.props.match.params.user_id}`)
            .then(res => {
                this.setState({
                    yourEvents: res.data
                })
            })
    }

    render() {
        let mappedEvents = this.state.yourEvents.map((event, i) => {
            return (
                <Link to={`/event/${this.props.match.params.user_id}/${event.event_id}`} key={i}>
                <div className='event-display-box'>
                    <h3>{event.event_name}</h3>
                    <div>
                        <h5>Date: {event.date}</h5>
                        <h5>Time: {event.start_time} - {event.end_time}</h5>
                    </div>
                </div>
                </Link >
            )
        })
        return (
            <div>
                <h1>YourEvents</h1>
                {mappedEvents}
            </div>
        )
    }
}