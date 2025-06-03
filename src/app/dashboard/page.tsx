'use client';
import ProductPage from '@/components/myDashboard/ProductPage';
import OrderPage from '@/components/myDashboard/OrderPage';
import CustomerPage from '@/components/myDashboard/CustomerPage';
import Sidebar from '@/components/myDashboard/Sidebar';
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '@/graphql/product';

export const myNav = [
  {
    _id: "1",
    title: "Products"
  },
  {
    _id: "2",
    title: "Orders"
  },
  {
    _id: "3",
    title: "Customers"
  },
];

const Page = () => {
  const [selectedPage, setSelectedPage] = useState<string>('Products');
  const [products, setProducts] = useState<any[]>([]);  // State to store fetched products

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      console.log("Fetched Products:", fetchedProducts);  // Log the fetched products
      console.log("Products State:", selectedPage);  // Log the state after setting it
      
    };
    fetchData();
  }, []);  // Fetch products once on component mount

  // Function to handle navigation
  const handleNavClick = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <div className="flex">
      <Sidebar myNav={myNav} onNavClick={handleNavClick} />
      {/* <ProductPage products={products} /> */}
      {selectedPage === "Products" && <ProductPage products={products} />}
      {selectedPage === 'Orders' && <OrderPage />}
      {selectedPage === 'Customers' && <CustomerPage />}
    </div>
  );
};

export default Page;
