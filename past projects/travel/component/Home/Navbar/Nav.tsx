   "use client";// "use client"; // Uncomment this line to mark the file as a client component

import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { TbAirBalloon } from 'react-icons/tb';

type Props = {
  opeNav: () => void;
};

const Nav = ({ opeNav }: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <div
      className={`fixed w-full transition-all duration-200 h-[12vh] z-[1000] ${navBg?
    'bg-blue-600 shadow-md' : ''
      }`}
    > 
      <div className='flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto'>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center flex-col'>
            <TbAirBalloon className='w-6 h-6 text-white' />
          </div>
          <h1 className='text-xl md:text-2xl text-white uppercase font-bold'>Alwodin</h1>
        </div>
       <div className="hidden lg:flex items-center space-x-10">
  {navLinks.map((link) => (
    <Link href={link.url} key={link.id}>
      <p
        className="
          relative
          text-white
          text-base
          font-medium
          inline-block
          after:block
          after:content-['']
          after:absolute
          after:left-0 after:bottom-0
          after:h-[3px]
          after:bg-blue-300
          after:w-full
          after:scale-x-0
          transform
          hover:after:scale-x-100
          transition-all
          duration-300
          after:origin-right
        "
      >
        {link.label}
      </p>
    </Link>
  ))}
   </div>

        
        <div className='flex items-center space-x-4'>
             <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95">
             <span className="relative z-10">Premium Effect</span>
             <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
             </button>
          <HiBars3BottomRight
            onClick={opeNav}
            className='w-8 h-8 cursor-pointer text-white lg:hidden'
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
