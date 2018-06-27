import React from 'react';
import './About.css';
import grill from './PropaneGrill8Burner.jpg';
import fryer from './786305.jpg';
import argentina from './patagonia.svg';
import Carousel from '../Carousel/Carousel';

export default function About() {
    return (
        <div className='text-color about-holder'>
            <Carousel />
            <h2 className='text-color about-title'>Food from the Patagonia</h2>
            <div className='top-bottom-lines'>
                <div className='left-box'>
                    <h3>How did our company start?</h3>
                    <p className='about-desc-box'>We began making our delicious food here in the Western US in 2015 after having spent a few years living in the heart of the Patagonia, falling completely in love with their cuisine.</p>
                </div>
                <div className='right-box'>
                    <h3>What is our mission?</h3>
                    <p className='about-desc-box'>To serve the greatest and best tasting food from the most Southern part of the world, to the people attending your event.</p>
                </div>
                <div>
                    <h3>What is the Patagonia?</h3>
                    <img src={argentina} alt='' width='150px' />
                    <p className='about-desc-box'>The Southern most region of Argentina.</p>
                </div>
            </div>
            <br />
            <h3>What tools do we use?</h3>
            <div className='grill-holder'>
                <div>
                    <img src={fryer} alt='' width='250px' />
                    <p className='about-desc-box'>We do our frying with a Crown Verity PF-2LP Double Tank Portable Outdoor Fryer.</p>
                </div>
                <div>
                    <img src={grill} alt='' width='300px' />
                    <p className='about-desc-box'>We do our grilling with a M-15B Charcoal Grill from Big John.</p>
                </div>
            </div>
        </div>
    )
}