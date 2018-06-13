import React, {Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/getProducts')
            .then(res => this.setState({
                products: res.data
            }))
    }

    render() {
        let mappedProducts = this.state.products.map(product => {
            return (
                <Product key={product.product_id} product={product}/>
            )
        })
        console.log(this.state.products)
        return (
            <div>
                {mappedProducts}
            </div> 
        )
    }
}