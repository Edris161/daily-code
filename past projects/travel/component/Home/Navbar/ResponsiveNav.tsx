"use client";

import { useState } from 'react';
import Nav from './Nav';
import Mobilenav from './Mobilenav';

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);

  const handleOpenNav = () => {
    setShowNav(true);
  };

  const handleCloseNav = () => {
    setShowNav(false);
  };

  return (
    <div className="relative">
      <Nav opeNav={handleOpenNav} />
      <Mobilenav showNav={showNav} closeNav={handleCloseNav} />
    </div>
  );
};

export default ResponsiveNav;
