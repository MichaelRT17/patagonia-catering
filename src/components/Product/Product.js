import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            showModal1: false,
            showModal2: false
        }
        this.handleOpenModal1 = this.handleOpenModal1.bind(this);
        this.handleCloseModal1 = this.handleCloseModal1.bind(this);
        this.handleOpenModal2 = this.handleOpenModal2.bind(this);
        this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    }

    handleAddToCart() {
        if(this.props.user_id) {
            axios.post('/api/addToCart', {
                product_id: this.props.product.product_id,
                amount: this.state.quantity,
                user_id: this.props.user_id
            }).then(res => {
                this.setState({
                    quantity: 0
                })
                this.handleOpenModal1()
            })
        } else {
            this.handleOpenModal2()
        }
    }

    handleOpenModal1() {
        this.setState({ showModal: true });
    }

    handleCloseModal1() {
        this.setState({ showModal: false });
    }

    handleOpenModal2() {
        this.setState({ showModal: true });
    }

    handleCloseModal2() {
        this.setState({ showModal: false });
    }

    render() {
        console.log(this.state.quantity)
        return (
            <div className='info-border'>
                <h3 className='info-text'>{this.props.product.product_name}</h3>
                <img width='300px' src={this.props.product.product_img} alt='food' />
                <div className='info-box'>
                    <h5 className='info-text'>Price: ${this.props.product.product_price}</h5>
                    <p> </p>
                    <h5 className='info-text'>Feeds: {this.props.product.feeds} people</h5>
                    <p> </p>
                    <h5 className='info-text'>Quantity: {this.props.product.quantity}</h5>
                </div>
                <p className='food-desc info-text'>{this.props.product.product_desc}</p>
                <div className='add-to-cart'>
                    <h4 className='info-text'>How many do you need?</h4>
                    <input type="number" min='1' placeholder='0' style={{ width: '30px', height: '15px', border: 'solid 1px #555555', textAlign: 'center' }}
                        onChange={e => this.setState({ quantity: e.target.value })} />
                    <Icon style={{ color: '#555555' }} onClick={() => this.handleAddToCart()}>
                        add_shopping_cart
                    </Icon>
                </div>
                <ReactModal
                    isOpen={this.state.showModal1}
                    className='modal-dialog'
                >
                    <p className='text-color center'>Succesfully added to cart!</p>
                    <div className='icon-holder'>
                        <Icon onClick={this.handleCloseModal1} style={{ fontSize: '40px', color: '#F6B506' }} >
                            close
                        </Icon >
                        <Link to='/cart' >
                            <Icon style={{ fontSize: '30px', color: '#F6B506' }}>
                                shopping_cart
                            </Icon >
                        </Link >
                    </div>
                </ReactModal >
                <ReactModal
                    isOpen={this.state.showModal2}
                    className='modal-dialog'
                >
                <p className='text-color center'>You must login to add items to your cart.</p>
                <div className='icon-holder'>
                        <Icon onClick={this.handleCloseModal2} style={{ fontSize: '40px', color: '#F6B506' }} >
                            close
                        </Icon >
                        <a href={process.env.REACT_APP_LOGIN}>
                            <Icon style={{ fontSize: '40px', color: '#F6B506' }}>
                                account_circle
                            </Icon >
                        </a>
                    </div>
                </ReactModal >
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id
    }
}

export default connect(mapStateToProps)(Product)

