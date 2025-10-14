import React from 'react'
import { FaCalendarWeek, FaMap } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

const SearchBox = () => {
  return (
    <div className="bg-white rounded-lg p-8 gird grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
       items-center justify-center gap-8 mt-4 sm:mt-12 w-[95%] sm:w-[80%] flex">
      <div className='flex items-center space-x-6'>
        <FaMap  className='w-6 h-6 text-blue-400'/>
         <div>
         <p className="text-lg font-medium mb-[0.2rem]"> Location</p>
          <input type="text" placeholder='Where are you going?' className='border-none outline-none text-gray-800'/>
          </div>
      </div>
      <div className='flex items-center space-x-6'>
        <FaCalendarWeek className='w-6 h-6 text-blue-400'/>
        <div>
          <p className='text-lg font-medium mb-[0.2rem]'>Start Date</p>
          <input type="date" className='border-none outline-none text-gray-800'/>
        </div>
      </div>
      <div className='flex items-center space-x-6'>
        <FaCalendarWeek className='w-6 h-6 text-blue-400'/>
        <div>
          <p className='text-lg font-medium mb-[0.2rem]'>End Date</p>
          <input type="date" className='border-none outline-none text-gray-800'/>
        </div>
      </div>
      <div className='flex items-center space-x-6'>
        <FaUserGroup className='w-6 h-6 text-blue-400'/>
        <div>
          <p className='text-lg font-medium mb-[0.2rem]'>Guest</p>
          <p className='text-base font-normal'>1 Guest 1 Room</p>
        </div>
         <SearchBox />
         <link href="#" className='rounded px-14 md:px-28 mt-4 py-2.5 overflow-hidden group bg-rose-500 relative 
         hover:bg-gradient-to-r hover:from-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-300 
         transition-all ease-out duration-300 ' />
         <span className='absolute right-0 w-8 h-32 mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:translate-x-40 ease'></span>
         <span className='relative font-bold'>Search</span>
      </div>
    </div>
  )
}

export default SearchBox ;