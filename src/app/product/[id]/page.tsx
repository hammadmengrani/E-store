import React from "react";
import { myData } from "../../../../data";
import ThumbnailImage from "@/components/common/ThumbnailImage";
import ProductDescription from "@/components/common/ProductDescription";
import Desc from "@/components/common/Desc";
import { fetchProducts } from "@/graphql/product";

export interface SingleProductProps {
  params: { id: string };
}

const Page = async ({ params }: SingleProductProps) => {
  const products = await fetchProducts(); // ✅ API Call in Server Component
  const id = params.id;
  const product = products.find((x) => x.id === id);


  if (!product) return <div>NO Product Found</div>;

  return (
    <div className="container py-10 w-full mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
      <ThumbnailImage imageUrl={product.imageUrl} multiImages={product.multiImages} />
      <ProductDescription
      id={product.id}
      img={product.imageUrl}
        title={product.title}
        description={product.description}
        category={product.category}
        variations={product.variations}
        price={product.price}
        discount={product.salePrice}
      />
        </div>
        <Desc desc={product.description}/>

    </div>
  );
};

export default Page;
