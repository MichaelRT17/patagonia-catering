import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            subject: '',
            message: ''
        }
    }

    sendMail() {
        axios.post('/api/sendMail', {
            email: this.state.email,
            name: this.state.name,
            subject: this.state.subject,
            message: this.state.message
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Contact us here:</h1>
                <h4>Your email: </h4>
                <input value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                <h4>Your name: </h4>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                <h4>Subject: </h4>
                <input value={this.state.subject} onChange={e => this.setState({subject: e.target.value})}/>
                <h4>Message: </h4>
                <input value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                <button onClick={this.sendMail}>
                    Send Message
                    </button>
                <br />
                <h5>We will respond to you as quickly as possible!</h5>
            </div> 
        )
    }
}