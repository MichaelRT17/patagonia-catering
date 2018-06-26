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
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleAddToCart() {
        axios.post('/api/addToCart', {
            product_id: this.props.product.product_id,
            amount: this.state.quantity,
            user_id: this.props.user_id
        }).then(res => {
            this.setState({
                quantity: 0
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
                    isOpen={this.state.showModal}
                    className='modal-dialog'
                >
                    <p className='text-color center'>Succesfully added to cart!</p>
                    <div className='icon-holder'>
                        <Icon onClick={this.handleCloseModal} style={{ fontSize: '40px', color: '#F6B506' }} >
                            close
                        </Icon >
                        <Link to='/cart' >
                            <Icon style={{ fontSize: '30px', color: '#F6B506' }}>
                                shopping_cart
                            </Icon >
                        </Link >
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

