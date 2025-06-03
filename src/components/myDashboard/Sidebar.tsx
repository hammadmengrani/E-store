import React from 'react';

export interface navArray {
  _id: string;
  title: string;
}

export interface nav {
  myNav: navArray[];
  onNavClick: (page: string) => void; // New prop to handle click
}

const Sidebar = (props: nav) => {
  return (
    <div className='sm:block hidden bg-black h-[100vh] w-64'>
      <div className='flex flex-col gap-10 justify-center mx-auto px-5 py-5'>
        {props.myNav.map((item, key) => (
          <button
            key={key}
            className='text-white hover:bg-gray-600 p-3 text-left'
            onClick={() => props.onNavClick(item.title)} // Trigger callback on click
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
