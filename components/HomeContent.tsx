import React from 'react';
import Header from './homepage/Header';
import FeaturedProducts from './homepage/FeaturedProducts';
import ChatButton from './homepage/ChatButton';
import AgePopUp from './homepage/AgePopUp';


const HomeContent = () => {

  return (
    <div className='overflow-hidden'>
      <AgePopUp />
      <Header />
      <FeaturedProducts />
      <ChatButton />
    </div>
  )
}

export default HomeContent