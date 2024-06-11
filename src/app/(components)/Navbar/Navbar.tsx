"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            My Store
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/Allproduct" className="text-white">
              All Products
            </Link>
            
            <Link href="/Singlepriduct" as="/Singlepriduct" className="text-white">
              Single Product
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleDrawer} className="text-white">
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleDrawer}></div>
      <div className={`fixed top-0 left-0 h-full w-64 bg-blue-600 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex flex-col items-center mt-16 space-y-4">
          <Link href="/Allproduct" className="text-white" onClick={toggleDrawer}>
            All Products
          </Link>
          <Link href="/Singlepriduct" as="/Singlepriduct" className="text-white" onClick={toggleDrawer}>
            Single Product
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
