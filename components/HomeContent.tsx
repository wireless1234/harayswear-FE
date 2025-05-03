import React from 'react';
import Header from './homepage/Header';
import ServicesSlide from './homepage/ServicesSlide';
import ChatButton from './homepage/ChatButton';
import OurProductsSlide from './homepage/OurProductsSlide';
import OtherProducts from './homepage/OtherProducts';
import OurValues from './homepage/OurValues';
import Newsletter from './homepage/Newsletter';

const HomeContent = () => {
  return (
    <div className='overflow-hidden'>
      <Header />
      <ServicesSlide />
      <ChatButton />
      <OurProductsSlide />
      <OtherProducts />
      <OurValues />
      <Newsletter />
    </div>
  )
}

export default HomeContent