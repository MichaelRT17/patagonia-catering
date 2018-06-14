import React, {Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        }
    }

    componentDidMount() {
        let items = [];
        axios.get('/api/getCartItems', {user_id: this.props.user_id})
            .then(res => 
                res.data.forEach(item => {
                    if(items.includes(item)) {

                    }
                }))
    }

    render() {
        let mappedItems = this.state.cartItems.map( item => {
            return (
                <div>
                    <h5>{item.product_name}</h5>
                </div>
            )
        })
        return (
            <div>
                <h2>Your Cart:</h2>
                {mappedItems}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id
    }
}

export default connect(mapStateToProps)(Cart);

