import React, {Component } from 'react';
import Product from '../Product/Product';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Product />
            </div> 
        )
    }
}