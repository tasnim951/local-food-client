import React from 'react';
import HeroSlider from '../components/HeroSlider';
import HowItWorksFeatures from '../components/HowItWorksFeatures';
import SpecialOffer from '../components/SpecialOffer';
const Home = () => {
  return (
    <div style= {{padding:"20px"}}>

      <HeroSlider/>
     <HowItWorksFeatures/>
     <SpecialOffer/>
    </div>
  );
};

export default Home;