import Link from "next/link";
import Image from "next/image";
import home from "./links/home";
import chef from "./links/chef";
import React from 'react';
import { FiShoppingBag } from "react-icons/fi";


export default function Home() {
  return (
    <>
      <header>
        <div className="container mx-auto mt-3">
          <div className=" grid grid-cols-3 gap-2">
            <div className="text-4xl p-7">
              <h1><span className="text-orange-400">food</span>man</h1>
            </div>
            <div className=" gap-7 flex items-center justify-center">
              <Link href="/links/home">Home</Link>
              <Link href="/links/chef">Chef</Link>
              <Link href="/links/special">special</Link>
              <Link href="/links/clinets">clinets</Link>
              <Link href="/links/contact us">contact us</Link>
            </div>
            <div className="flex items-center justify-end bg-amber-600 ruonded-full p-2">
              <FiShoppingBag />

            </div>
          </div>
        </div>


      </header>
      <section>
        <div className="flex flex-clo-2">
          <div className="p-9 mt-7 items-center">
            <h1 className="text-3xl">
              meet.eat & enjoy the true taste.
            </h1>
            <div className="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. .</p>
            <p>Lorem ipsum dolor sit amet consectetur </p>
            <p>Lorem ipsum dolor sit amet </p>

            </div>

          </div>
          <div className="justify-right p-9 space-x-1">
            <Image
              src="/photo.png"
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </>

  );
}
