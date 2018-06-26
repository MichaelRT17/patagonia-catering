import React from 'react';
import './About.css';
import grill from './PropaneGrill8Burner.jpg';
import fryer from './786305.jpg';
import argentina from './Screen-Shot-2018-05-31-at-2.55.49-PM-e1528758856283.png';
import Carousel from '../Carousel/Carousel';

export default function About() {
    return (
        <div className='text-color'>
            <h2 className='text-color'>Food from the Patagonia</h2>
            <Carousel />
            <h3>What is the Patagonia?</h3>
            <img src={argentina} alt='' width='150px'/>
            <p>The Southern most region of Argentina.</p>
            <h3>What is our mission?</h3>
            <p>To serve the greatest and best tasting food from the most Southern part of the world, to the people attending your event.</p>
            <h3>How did our company start?</h3>
            <p>We began making our delicious food here in the Western US in 2015 after having spent a few years living in the heart of the Patagonia, falling completely in love with their cuisine.</p>
            <h3>What tools do we use?</h3>
            <img src={fryer} alt='' width='250px' />
            <p>We do our frying with a Crown Verity PF-2LP Double Tank Portable Outdoor Fryer.</p>
            <img src={grill} alt='' width='300px' />
            <p>We do our grilling with a M-15B Charcoal Grill from Big John.</p>
        </div>
    )
}