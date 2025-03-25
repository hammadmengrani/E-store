import React from 'react';
import ShopSidebar from './ShopSidebar';
import { myData } from '../../../data';

// Extract min & max price from dataset
const prices = myData.map(item => item.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

const uniqueCategories: string[] = Array.from(new Set(myData.map(item => item.category[0])));

const Sidebar = () => {
  return (
    <div className='flex py-5 '>
      {/* Pass minPrice & maxPrice to ShopSidebar */}
      <ShopSidebar categories={uniqueCategories} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default Sidebar;
