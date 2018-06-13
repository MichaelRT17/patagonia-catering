import React, { Component } from 'react';
import logo from './letter-p.png';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './Header.css';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navmenu: false
        }
    }

    handleNavClick() {
        this.setState({
            navmenu: false
        })
    }

    render() {
        return (
            <div>
                <header className='header-block'>
                    <Link to='/' >
                        <div className='icon-box'>
                            <img height='50px' src={logo} alt='' />
                            <h3>atigonia</h3>
                        </div>
                    </Link >
                    <Icon style={{ fontSize: 40, color: '#F6B506' }}
                        onClick={() => this.setState({ navmenu: !this.state.navmenu })}>
                        add_circle
                    </Icon >
                </header>
                <nav className={this.state.navmenu ? "navbar" : "hiddennavbar"}>
                    <Link to='/about' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>About</h4>
                    </Link >
                    <Link to='/contact' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>Contact</h4>
                    </Link>
                    <Link to='/cart' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>Cart</h4>
                    </Link>
                </nav>
            </div>
        )
    }
}