import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
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

    handleDeleteEvent(event_id, paid) {
        if (paid === 'PAID') {
            alert('You have already paid for this event. Please contact us to cancel your event.')
        }
        else {
            axios.delete(`/api/deleteEvent/${event_id}`)
                .then(res => {
                    this.componentDidMount()
                })
        }
    }

    render() {
        let mappedEvents = this.state.yourEvents.map((event, i) => {
            return (
                <div className='event-display-box' key={i}>
                    <Link to={`/event/${this.props.match.params.user_id}/${event.event_id}`} >
                        <h3 className='text-color'>{event.event_name}</h3>
                    </Link >
                    <Link to={`/event/${this.props.match.params.user_id}/${event.event_id}`} >
                        <div className='text-color'>
                            <h5>Date: {event.date}</h5>
                            <h5>Time: {event.start_time}-{event.end_time}</h5>
                        </div>
                    </Link >
                    <div>
                        <h5>{event.paid}</h5>
                        <Icon style={{ fontSize: '20px', color: '#F6B506' }}>
                            edit
                            </Icon>
                        <Icon style={{ fontSize: '20px', color: '#F6B506' }}
                            onClick={() => this.handleDeleteEvent(event.event_id, event.paid)}>
                            delete_forever
                            </Icon>
                    </div>
                </div>

            )
        })
        return (
            <div>
                <h1 className='text-color'>Your Events:</h1>
                {mappedEvents}
            </div>
        )
    }
}