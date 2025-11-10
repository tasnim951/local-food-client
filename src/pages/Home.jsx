import React from 'react';
import HeroSlider from '../components/HeroSlider';
import HowItWorksFeatures from '../components/HowItWorksFeatures';
import SpecialOffer from '../components/SpecialOffer';
import ReviewCard from '../components/ReviewCard';
const Home = () => {
  return (
    <div style= {{padding:"20px"}}>

      <HeroSlider/>
      <ReviewCard/>
     <HowItWorksFeatures/>
     <SpecialOffer/>
    </div>
  );
};

export default Home;