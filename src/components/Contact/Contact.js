import React, { Component } from 'react';
import axios from 'axios';
import './Contact.css';

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            subject: '',
            message: ''
        }
        this.sendMail = this.sendMail.bind(this);
    }

    sendMail() {
        console.log(this.state)
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
            <div className='text-color'>
                <h1>Contact us here:</h1>
                <h4>Your email: </h4>
                <input value={this.state.email} onChange={e => this.setState({email: e.target.value})}
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }}/>
                <h4>Your name: </h4>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }}/>
                <h4>Subject: </h4>
                <input value={this.state.subject} onChange={e => this.setState({subject: e.target.value})}
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }}/>
                <h4>Message: </h4>
                <textarea value={this.state.message} onChange={e => this.setState({message: e.target.value})}
                    rows='5' cols='50' className='message-box'>
                </textarea>
                <button onClick={this.sendMail}>
                    Send Message
                    </button>
                <br />
                <h5>We will respond to you as quickly as possible!</h5>
            </div> 
        )
    }
}