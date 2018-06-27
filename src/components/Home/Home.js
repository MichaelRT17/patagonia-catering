import React, { Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            selectedValue: 'a'
        }
    }

    componentDidMount() {
        axios.get('/api/getProducts')
            .then(res => this.setState({
                products: res.data
            }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedValue !== prevState.selectedValue && this.state.selectedValue === 'a') {
            axios.get('/api/getProducts')
                .then(res => this.setState({
                    products: res.data
                }))
        }
        else if (this.state.selectedValue !== prevState.selectedValue && this.state.selectedValue === 'b') {
            axios.get('/api/getMains')
                .then(res => this.setState({
                    products: res.data
                }))
        }
        else if (this.state.selectedValue !== prevState.selectedValue && this.state.selectedValue === 'c') {
            axios.get('/api/getSides')
                .then(res => this.setState({
                    products: res.data
                }))
        }
        else if (this.state.selectedValue !== prevState.selectedValue && this.state.selectedValue === 'd') {
            axios.get('/api/getDesserts')
                .then(res => this.setState({
                    products: res.data
                }))
        }
    }

    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    render() {
        let mappedProducts = this.state.products.map(product => {
            return (
                <Product key={product.product_id} product={product} />
            )
        })
        console.log(this.state.products)
        console.log(this.state.selectedValue)
        return (
            <div>
                <div className='selection-holder'>
                    <div>
                        <Radio
                            checked={this.state.selectedValue === 'a'}
                            onChange={this.handleChange}
                            value="a"
                            color="default"
                            name="radio-button-demo"
                            aria-label="A"
                        />
                        <h5 className='text-descrip'>Show All</h5>
                    </div>
                    <div>
                        <Radio
                            checked={this.state.selectedValue === 'b'}
                            onChange={this.handleChange}
                            value="b"
                            color="default"
                            name="radio-button-demo"
                            aria-label="B"
                        />
                        <h5 className='text-descrip'>Mains</h5>
                    </div>
                    <div>
                        <Radio
                            checked={this.state.selectedValue === 'c'}
                            onChange={this.handleChange}
                            value="c"
                            color="default"
                            name="radio-button-demo"
                            aria-label="C"
                        />
                        <h5 className='text-descrip'>Sides</h5>
                    </div>
                    <div>
                        <Radio
                            checked={this.state.selectedValue === 'd'}
                            onChange={this.handleChange}
                            value="d"
                            color="default"
                            name="radio-button-demo"
                            aria-label="D"
                        />
                        <h5 className='text-descrip'>Desserts</h5>
                    </div>
                </div>
                <div className='list-of-products'>
                    {mappedProducts}
                </div>
            </div>
        )
    }
}