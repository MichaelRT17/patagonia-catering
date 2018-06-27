import React, { Component } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import './Contact.css';

ReactModal.setAppElement();

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            subject: '',
            message: '',
            showModal: false
        }
        this.sendMail = this.sendMail.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    sendMail() {
        console.log(this.state)
        axios.post('/api/sendMail', {
            email: this.state.email,
            name: this.state.name,
            subject: this.state.subject,
            message: this.state.message
        }).then(res => {
            console.log('hello')
            this.setState({
                email: '',
                name: '',
                subject: '',
                message: ''
            })
            this.handleOpenModal()
        })
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        console.log(this.state)
        return (
            <div className='text-color'>
                <h1>Contact us here:</h1>
                <h4>Your email: </h4>
                <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} spellCheck="false"
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                <h4>Your name: </h4>
                <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} spellCheck="false"
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                <h4>Subject: </h4>
                <input value={this.state.subject} onChange={e => this.setState({ subject: e.target.value })}
                    style={{ width: '198px', height: '18px', border: 'solid 1px #555555', textAlign: 'center', color: '#555555' }} />
                <h4>Message: </h4>
                <textarea value={this.state.message} onChange={e => this.setState({ message: e.target.value })}
                    rows='5' cols='50' className='message-box'>
                </textarea>
                <br />
                <Icon onClick={this.sendMail} style={{ fontSize: '40px', color: '#F6B506' }}>
                    mail
                </Icon >
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel='Minimal Modal Example'
                    className='modal-dialog'
                >
                    <p className='text-color center'>Your message has been sent. <br /><br /> We will respond to you as quickly as possible!</p>
                    <div className='exit-holder'>
                    <Icon onClick={this.handleCloseModal} style={{ fontSize: '40px', color: '#F6B506'}} >
                        close
                    </Icon >
                        </div> 
                </ReactModal >
            </div>
        )
    }
}