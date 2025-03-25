'use client';
import React, { useState } from "react";
import MobileMenubar, { MenuItem } from "./MobileMenubar";
import Menubar from "./Menubar";
import Sidebar from "../container/Sidebar";

export interface NavbarProps {
  logo: string;
  menu?: Array<MenuItem>;
}

const Navbar: React.FC<NavbarProps> = ({ logo, menu }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    setIsSearch(false); 
    setSidebarOpen(true);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    setIsSearch(true); 
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col sticky w-full justify-between items-center top-0 mx-auto z-50">
      <div className="flex md:gap-4 justify-between bg-white w-full p-5">
        <div className="container mx-auto flex w-[1100px] justify-between items-center gap-2">
          <div className="flex flex-row gap-2">
          <MobileMenubar menuItems={menu} />
          <a href="/">
            <img src={logo} alt="logo" className="w-36 md:w-full" />
          </a>
          </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={handleCartClick}
            className="bg-[#059DDE] hover:bg-yellow-500 transition-all duration-300 rounded-full w-10 h-10 md:w-[45px] md:h-[45px] flex items-center justify-center"
          >
            <img
              src="/cart.svg"
              className="w-6 h-6 filter brightness-0 invert"
              alt="Cart"
            />
          </button>
          <a
            href="/"
            onClick={handleSearchClick}
            className="bg-[#059DDE] hover:bg-yellow-500 transition-all duration-300 rounded-full w-10 h-10 md:w-[45px] md:h-[45px] flex items-center justify-center"
          >
            <img
              src="/search.svg"
              className="w-8 h-8 filter brightness-0 invert"
              alt="Search"
            />
          </a>
        </div>
      </div>
      </div>
      <div className="bg-[#059DDE] flex w-full py-3">
        <Menubar menuItems={menu} />
      </div>
      {isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          AddtoCart={!isSearch} // Pass true for AddtoCart if not searching
          Searchbar={isSearch} // Pass true for Searchbar if searching
        />
      )}
    </div>
  );
};

export default Navbar;
