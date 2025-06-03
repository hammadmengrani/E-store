import Card from "@/components/common/Card";
import Sidebar from "@/components/common/Sidebar";
import SectionContainer from "@/components/container/SectionContainer";
import React from "react";
import { myData } from "../../../data";
import { fetchProducts } from "@/graphql/product";

const page = async () => {
    const products = await fetchProducts(); // ✅ API Call in Server Component
  return (
    <div className="flex flex-row items-start md:gap-10 justify-center py-5 px-5">
        <Sidebar/>
        <Card card={products}  className="grid grid-cols-2 overflow-hidden sm:grid-cols-2 md:grid-cols-3 gap-4 py-5"/>
    </div>
  );
};

export default page;
