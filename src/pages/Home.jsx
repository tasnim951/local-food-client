import React from 'react';
import HeroSlider from '../components/HeroSlider';
import HowItWorksFeatures from '../components/HowItWorksFeatures';
const Home = () => {
  return (
    <div style= {{padding:"20px"}}>

      <HeroSlider/>
     <HowItWorksFeatures/>
    </div>
  );
};

export default Home;