import React from "react";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center py-5 fixed top-0 z-20 bg-transparent">
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-6'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-red rounded-full overflow-hidden'>
            <img 
              src={logo} 
              alt="logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Mohit thakur &nbsp;
            <span className='sm:block hidden'> </span>
          </p>
        </div>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          <li className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
            <a href="#about">About</a>
          </li>
          <li className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
            <a href="#work">Work</a>
          </li>
          <li className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
