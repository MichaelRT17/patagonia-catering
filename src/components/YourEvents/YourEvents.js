import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import ReactModal from 'react-modal';
import './YourEvents.css';

export default class YourEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourEvents: [],
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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
            this.handleOpenModal()
        }
        else {
            axios.delete(`/api/deleteEvent/${event_id}`)
                .then(res => {
                    this.componentDidMount()
                })
        }
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        let mappedEvents = this.state.yourEvents.map((event, i) => {
            return (
                <div className='event-display-box' key={i}>
                    <Link to={`/event/${this.props.match.params.user_id}/${event.event_id}`} >
                        <h3 className='text-color' style={{ width: '91px' }}>{event.event_name}</h3>
                    </Link >
                    <Link to={`/event/${this.props.match.params.user_id}/${event.event_id}`} >
                        <div className='text-color' style={{ width: '105px' }}>
                            <h5>Date: {event.date}</h5>
                            <h5>Time: {event.start_time}-{event.end_time}</h5>
                        </div>
                    </Link >
                    <div style={{ width: '70px' }}>
                        <h5>{event.paid}</h5>
                        <Link to={`/eventEditor/${this.props.match.params.user_id}/${event.event_id}`}>
                            <Icon style={{ fontSize: '25px', color: '#F6B506', padding: '0 5px' }}>
                                edit
                            </Icon>
                        </Link>
                        <Icon style={{ fontSize: '25px', color: '#F6B506', padding: '0 5px' }}
                            onClick={() => this.handleDeleteEvent(event.event_id, event.paid)}>
                            delete_forever
                        </Icon>
                    </div>
                    <ReactModal
                        isOpen={this.state.showModal}
                        className='modal-dialog'
                    >
                        <p className='text-color center'>You have already paid for this event. Please contact us in order to cancel.</p>
                        <div className='exit-holder'>
                            <Icon onClick={this.handleCloseModal} style={{ fontSize: '40px', color: '#F6B506' }} >
                                close
                            </Icon >
                        </div>
                    </ReactModal >
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