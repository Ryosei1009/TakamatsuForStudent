import React, { useState } from 'react';
import Upload from './Upload';

const MenuBar = ({ setPhotos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      <input type="checkbox" className="hidden" id="openSidebarMenu" checked={isOpen} onChange={toggleOpen} />
      <label htmlFor="openSidebarMenu" className="fixed z-50 cursor-pointer top-6 max-sm:top-22 left-6">
        <div className="absolute h-14 w-14 bg-white z-30 -top-4 -left-4 rounded-2xl"></div>
        <div className={`absolute h-1 w-6 bg-black transform origin-center transition-all z-40 ${isOpen ? 'rotate-135 top-2' : ''}`}></div>
        <div className={`absolute h-1 w-6 bg-black transition-all z-40 ${isOpen ? 'opacity-0' : 'top-2 opacity-100'}`}></div>
        <div className={`absolute h-1 w-6 bg-black transform origin-center transition-all z-40 ${isOpen ? '-rotate-135 top-2' : 'top-4'}`}></div>
      </label>

      <div id="sidebarMenu" className={`h-full top-0 bg-white fixed left-0 overflow-scroll scroll-hidden w-80 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20 rounded-r-3xl`}>
        <div className="top-24 max-sm:top-32 absolute">
          <Upload />
        </div>
      </div>
    </div>
  );
}

export default MenuBar;