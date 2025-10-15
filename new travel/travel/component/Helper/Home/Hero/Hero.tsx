// src/components/Hero.jsx
import React from 'react';
import SearchBox from '../../Searchbox';

const Hero = () => {
  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-10" />

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
          <div className="text-center">
            <h1 className="text-[25px] md:text-[35px] lg:text-[45px] mb-4 tracking-[0.7rem] text-white font-bold uppercase">
              Let’s Enjoy Travel
            </h1>
            <p className="text-lg md:text-base text-white font-normal [word-spacing:5px]">
              Get the best price on 2,000,000+ properties, worldwide
            </p>
          </div>

          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default Hero;
