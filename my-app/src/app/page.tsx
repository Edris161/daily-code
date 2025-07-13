import Image from "next/image";
import { TbShoppingBagCheck } from "react-icons/tb";
import { TbHeartCheck } from "react-icons/tb";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CiShoppingCart } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { SiAmazonpay } from "react-icons/si";
import { GoHome } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
export default function Home() {
  return (
    <>
    <header>
       <div className="container mx-auto p-4">
  <div className="grid grid-cols-3 gap-4">
  <div className=" flex items-center gap-4">
    <Image
      src="/photo.jpg"
      alt="profile"
      width={50}
      height={50}
      className="rounded-full w-16 h-16"
  
    />
    <div className=" bg-[#89dfd3] rounded-lg p-4">
        <TbShoppingBagCheck />
      </div>
    <div className=" bg-[#89dfd3] rounded-lg p-4">
         <TbHeartCheck />
    </div>
  </div>
  <div className=" bg-[#]">
    <form>
      
      <input
      type="search"
      placeholder="Search"
      className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#89dfd3] focus:border-transparent "
      />
   
    </form>
  </div>
  <div className=" flex gap-1.5 justify-end">
    <p className="flex items-center">Online shop</p>
    <div className="flex items-center">
       <CiShoppingCart />
    </div>
  </div>

</div>    
    </div>
    <div className="bg-blue-500 mt-4 flex justify-between ">
      <div className="flex justify-end gap-3">
        <p className=" justify-right">Items</p>
       <HiOutlineMenuAlt3 />
     
      
       <div className="flex item-center p-5">
         <ul className=" flex justify-center gap-4 text-white">
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/'>About Us</Link></li>
          <li><Link href='/'>Contact Us</Link></li>
          <li><Link href='/'>Blogs</Link></li>
          <li><Link href='/'>Contact Us</Link></li>
        </ul>
       </div>  
       
      
      </div>
      

    </div>
    </header>
    <section className="bg-[#FBB10B]   py-32 bg-[url(/hero-cover.png)] bg-cover  ">
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <div className="w-1/2 text-center ">
          <h1 className="text-4xl bg-[#FB8500] inline-block px-3 py-2 rounded-lg mb-4">
            !Welcome to Our Online Shop
          </h1>
          <p className="text-lg">  Discover a wide range of products at unbeatable prices. Shop now and enjoy exclusive offers!</p>
          <div className="grid grid-cols-3 gap-4 mt-14 ">
             <div className="flex gap-2 items-center">
                  <div className=" p-2 bg-white/40 rounded-lg">
                   <IoCheckmarkDone />
                  </div>
                 <div>  Shopping Choice </div>
             </div>
             <div className=" flex gap-2 items-center">
                  <div className="p-2 bg-white/40 rounded-lg">
                  <SiAmazonpay />
                  </div>
                 <div>Pay the price</div>
             </div>
             <div className="flex gap-2 items-center">
                  <div className="p-2 bg-white/40 rounded-lg">
                    <GoHome />
                  </div>
                  <div>Home delevery</div> 
             </div>
          </div>
          </div>

        </div>

      </div>
    </section>
     <section>
       <div className="container mx-auto"> 
          <div>
            <h1 className="text-2xl mt-12 mb-6"> Top Selling Products</h1>
          </div>
         <div className="grid grid-cols-5 gap-4 mt-3">
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p1.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Flour</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
              <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p2.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">CHICKPEA</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
              <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p3.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">SUGER</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
              <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p4.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">RICE</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p5.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">EGG</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p6.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">OIL</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p7.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">TOMATO</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p8.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">MATAR</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p9.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">MAKRONI</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
             <div className="bg-[#E3F2FD] text-center py-8 px-3 rounded-2xl">
                  <Image
                   src="/p10.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">LAPA</div>
                  <div className="text-[#E82933] my-3">250 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
             </div>
          </div>
        </div>
     </section>
      <section>
        <div className="container mx-auto"> 
         <h1 className="text-3xl mt-12 mb-6">Prouducts Category</h1>
           <div className="grid grid-cols-4 gap-4 mt-3">
             
              <div className="bg-[#fcf7f7] flex items-center p-6 rounded-lg hover:scale-105 duration-200 shadow-2xl"> 
               <div className="w-1/2">
                   <div className="text-xl mb-2">Dairy Products</div>
                   <div className="opacity-50">Milk and etc</div>
                   <button className="bg-[#e82933] rounded-3xl px-10 py-1 inline-flex items-center gap-2 text[14px] text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Visit</button>
               </div>
               <div className="w-1/2">
                 <Image
                   src="/ph2.png"
                   alt=""
                   width={100}
                   height={100}
                   className=" inline-block mb-3"
                  />
               </div>
           </div>
           <div className="bg-[#fcf7f7] flex items-center p-6 rounded-lg hover:scale-105 duration-200 shadow-2xl"> 
               <div className="w-1/2">
                   <div className="text-xl mb-2">Dairy Products</div>
                   <div className="opacity-50">Milk and etc</div>
                   <button className="bg-[#e82933] rounded-3xl px-10 py-1 inline-flex items-center gap-2 text[14px] text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Visit</button>
               </div>
               <div className="w-1/2">
                 <Image
                   src="/ph3.png"
                   alt=""
                   width={100}
                   height={100}
                   className=" inline-block mb-3"
                  />
               </div>
           </div>
           <div className="bg-[#fcf7f7] flex items-center p-6 rounded-lg hover:scale-105 duration-200 shadow-2xl "> 
               <div className="w-1/2">
                   <div className="text-xl mb-2">Meat</div>
                   <div className="opacity-50"> and etc</div>
                   <button className="bg-[#e82933] rounded-3xl px-10 py-1 inline-flex items-center gap-2 text[14px] text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Visit</button>
               </div>
               <div className="w-1/2">
                 <Image
                   src="/ph4.png"
                   alt=""
                   width={100}
                   height={100}
                   className=" inline-block mb-3"
                  />
               </div>
           </div>
           <div className="bg-[#fcf7f7] flex items-center p-6 rounded-lg hover:scale-105 duration-200 shadow-2xl "> 
               <div className="w-1/2">
                   <div className="text-xl mb-2">Fruit and Vegetable</div>
                   <div className="opacity-50">Apple and etc</div>
                   <button className="bg-[#e82933] rounded-3xl px-10 py-1 inline-flex items-center gap-2 text[14px] text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Visit</button>
               </div>
               <div className="w-1/2">
                 <Image
                   src="/ph5.png"
                   alt=""
                   width={100}
                   height={100}
                   className=" inline-block mb-3"
                  />
               </div>
           </div>
           
            </div>
        </div>
      </section>
       <section>
          <div className="container mx-auto">
            <div>
            <h1 className="text-2xl mt-12 mb-6"> New products for sell</h1>
            </div>
             <div className="grid grid-cols-5 gap-4 mt-3">
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho1.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Simyan</div>
                  <div className="text-[#E82933] my-3">160 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho2.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Pista</div>
                  <div className="text-[#E82933] my-3">80 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho3.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Toot</div>
                  <div className="text-[#E82933] my-3">75 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho4.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Charmakhz</div>
                  <div className="text-[#E82933] my-3">130 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho5.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Badam</div>
                  <div className="text-[#E82933] my-3">80 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho6.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">TOOt</div>
                  <div className="text-[#E82933] my-3">50 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho7.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Badam</div>
                  <div className="text-[#E82933] my-3">150 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho8.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Badam</div>
                  <div className="text-[#E82933] my-3">150 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho9.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Kishta</div>
                  <div className="text-[#E82933] my-3"> 170AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>
                <div className="bg-[#fdfcc1] text-center py-8 px-3 rounded-2xl">
                <Image
                   src="/pho10.png"
                   alt=""
                   width={80}
                   height={80}
                   className=" inline-block mb-3"
                  />
                  <div className="text-xl">Nakhod</div>
                  <div className="text-[#E82933] my-3">110 AFG</div>
                  <button className="bg-[#FBB500] rounded-2xl px-6 py-2 inline-flex items-center gap-2 text-white mt-6 cursor-pointer hover:bg-[#cb6c01]"><FiShoppingBag />Buy</button>
                </div>

             </div>
          </div>
       </section>
      <section>
        <div className=" bg-[url(/kabul3.jpg)] py-32">

        </div>
      </section>
    </>
    
   

  );
}