import React from 'react';
import Header from './homepage/Header';
import FeaturedProducts from './homepage/FeaturedProducts';
import ChatButton from './homepage/ChatButton';


const HomeContent = () => {

  return (
    <div className='overflow-hidden'>
      <Header />
      <FeaturedProducts />
      <ChatButton />
    </div>
  )
}

export default HomeContent