"use client";
import { navLinks } from "@/Constant/Constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const Mobilenav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";
  const overlayVisible = showNav
    ? "opacity-70 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-300 z-[1000] ${overlayVisible}`}
        onClick={closeNav}
        aria-hidden={!showNav}
      ></div>

      {/* Side nav */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-rose-900 text-white
          transform ${navOpen} transition-transform duration-300 z-[1001]
          flex flex-col justify-center space-y-6`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className="w-fit ml-12 border-b-[1.5px] pb-1 border-white hover:opacity-80 transition-opacity"
            onClick={closeNav}
          >
            <p className="text-[20px] sm:text-[30px]">{link.label}</p>
          </Link>
        ))}

        {/* Close Button */}
        <button
          onClick={closeNav}
          className="absolute top-4 right-4 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer flex items-center justify-center"
          aria-label="Close navigation menu"
        >
          <CgClose className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default Mobilenav;
