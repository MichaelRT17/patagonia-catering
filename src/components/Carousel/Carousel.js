import React, { Component } from 'react';
import Slider from 'react-slick';
import './Carousel.css';

export default class Carousel extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000
        };
        return (
            <Slider {...settings}>
                <div className='review-background'>
                    <h5>'It was the perfect food for our wedding!'</h5>
                    <p>- Carissa Thurman</p>
                </div>
                <div className='review-background'>
                    <h5>'All of my friends loved the milanesas!'</h5>
                    <p>- Alex Clark</p>
                </div>
                <div className='review-background'>
                    <h5>'Better than my my mom's own cooking.'</h5>
                    <p>- Missy Beutler</p>
                </div>
                <div className='review-background'>
                    <h5>'Yum yum yum!!!'</h5>
                    <p>- Blair Bryant</p>
                </div>
                <div className='review-background'>
                    <h5>'It was the talk of my birthday party! Five stars!!!'</h5>
                    <p>- Mason Galland</p>
                </div>
            </Slider>
        );
    }
}