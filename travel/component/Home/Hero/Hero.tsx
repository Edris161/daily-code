// src/components/Hero.jsx
import SearchBox from '@/component/Helper/SearchBox';
import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-10"></div>

      {/* Video background */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        src="/video1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute z-[100] w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex items-center justify-center flex-col w-full h-full">
          <div>
            <h1 className="text[25px] mb-4 md:mb-0 text-center md:text[35px] lg:text-[45px] tracking-[0.7rem] text-white font-bold uppercase"> Let's Enjoy Travel</h1>
          <p className="md:text-base text-center text-lg text-white font-normal [word-spacing:5px]"> Get the best price on 2,000,000+ properties, worldwide</p>
          </div>
          <SearchBox/>
        </div>
        </div>   
    </div>
  );
};

export default Hero;
