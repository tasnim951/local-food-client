import React, { useContext } from 'react';
import HeroSlider from '../components/HeroSlider';
import HowItWorksFeatures from '../components/HowItWorksFeatures';
import SpecialOffer from '../components/SpecialOffer';
import ReviewCard from '../components/ReviewCard';
import { AuthContext } from '../contexts/AuthProvider';  

const Home = () => {
  const { user } = useContext(AuthContext);  

  return (
    <div style={{ padding: "10px" }}>
      <HeroSlider />
      <ReviewCard loggedInUserEmail={user?.email} /> 
      <HowItWorksFeatures />
      <SpecialOffer />
    </div>
  );
};

export default Home;