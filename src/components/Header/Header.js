import React, { Component } from 'react';
import logo from './letter-p.png';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { getUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Header.css';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navmenu: false,
            loginmenu: false
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleNavClick() {
        this.setState({
            navmenu: false
        })
    }

    navIconClick() {
        this.setState({
            navmenu: !this.state.navmenu,
            loginmenu: false
        })
    }

    loginIconClick() {
        this.setState({
            navmenu: false,
            loginmenu: !this.state.loginmenu
        })
    }

    homeIconClick() {
        this.setState({
            navmenu: false,
            loginmenu: false
        })
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <header className='header-block'>
                    <Link to='/' >
                        <div className='icon-box' onClick={() => this.homeIconClick()}>
                            <img height='50px' src={logo} alt='' />
                            <h3>atigonia</h3>
                        </div>
                    </Link >
                    <div className='selector-box'>
                        <img height='35px' width='35px' style={{borderRadius:'50%', padding:'2.5px'}} src={this.props.user.user_img} alt='User Icon' 
                            className={this.props.user.user_img ? "account-icon" : "hidden-account-icon"} onClick={() => this.loginIconClick()}/>
                        <Icon style={{ fontSize: 40, color: '#F6B506' }} className={this.props.user.user_img ? "hidden-account-icon" : ""}
                            onClick={() => this.loginIconClick()}>
                            account_circle
                        </Icon >
                        <Icon style={{ fontSize: 40, color: '#F6B506' }}
                            onClick={() => this.navIconClick()}>
                            add_circle
                        </Icon >
                    </div>
                </header>
                <nav className={this.state.navmenu ? "navbar" : "hiddennavbar"}>
                    <Link to='/about' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>About</h4>
                    </Link >
                    <Link to='/contact' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>Contact</h4>
                    </Link>
                    <Link to='/cart' onClick={() => this.handleNavClick()}>
                        <h4 className={this.state.navmenu ? "dropmenu" : "dropmenuhidden"}>Cart
                            <Icon >
                                shopping_cart
                            </Icon >
                        </h4>
                    </Link>
                </nav>
                <nav className={this.state.loginmenu ? "login-bar" : "hidden-login-bar"}>
                    <h3>{this.props.user.user_name ? `Welcome, ${this.props.user.user_name}!` : 'Welcome, visitor!'}</h3>
                    <a href={this.props.user.user_id ? process.env.REACT_APP_LOGOUT : process.env.REACT_APP_LOGIN} >
                        <h4>{this.props.user.user_id ? 'Logout' : 'Login'}</h4>
                    </a>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser })(Header);