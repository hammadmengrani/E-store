import React, { useState } from "react";
import AddToCart from "../common/AddToCart";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  AddtoCart?: boolean;
  Searchbar?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, AddtoCart, Searchbar }) => {
  const [isEditOpen, setEditOpen] = useState(false);

  const toggleEditOpen = () => {
    setEditOpen(!isEditOpen);
  };

  return (
    <div className="relative z-50">
      <div
        className={`fixed inset-0 flex items-center justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      >
        <div
          className={`w-[20rem] md:w-[25rem] h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
        >
          {AddtoCart && <AddToCart onClose={onClose} />} {/* Pass onClose to AddToCart */}
          {Searchbar && (
            <div>Search over here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
