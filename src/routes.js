import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import About from './components/About/About';

export default (
    <Switch >
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/cart' component={Cart} />
        <Route path='/about' component={About} />
    </Switch >
)