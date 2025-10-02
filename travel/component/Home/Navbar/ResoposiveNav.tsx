"use client";
import React, { useState } from 'react';
import Nav from './Nav';
import Mobilenav from './Mobilenav';

const ResposiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const handNavShow = () =>  setShowNav(true);
   const handleCloseNav = () => setShowNav(false);
  
  return (
    <div>
        <Nav opeNav={handNavShow} />
    
      <Mobilenav showNav={showNav} closeNav={handleCloseNav} />
    </div>
  )
}

export default ResposiveNav;   