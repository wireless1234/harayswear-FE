import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const images = [
  '/images/service.svg',
  '/images/service.svg',
  '/images/service.svg',
  '/images/service.svg',
  '/images/service.svg',
];

function Services() {
  return (
    <section className='py-[62px]'>
        <Marquee  speed={100}>
          <div className='flex items-center md:gap-40 gap-10 pl-10 md:pl-40 '>
            <Image src={images[0]} alt='y!' width={548} height={96} />
            <Image
              src={images[1]}
              alt='business insider'
              width={548} height={96}
            />
            <Image src={images[2]} alt='the guardian' width={548} height={96} />
            <Image src={images[3]} alt='vanguard' width={548} height={96} />
            <Image src={images[4]} alt='this Day' width={548} height={96} />
          </div>
        </Marquee>
    </section>
  );
}

export default Services;
