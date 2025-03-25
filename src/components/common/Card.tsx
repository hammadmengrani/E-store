'use client'
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Discount from "./Discount";
import { useCart } from "@/context/CartContext";

export interface mCard {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  multiImages?: string[];
  price: number;
  salePrice?: number;
  quantity: number;
  category: string[];
  attribute?: string[]; // Attribute means variants are available
}

export interface cardArray {
  card: Array<mCard>;
  className?: string;
  slice?: boolean; // ✅ Added slice prop

}

const Card: React.FC<cardArray> = React.memo(({ card, className,slice }) => {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<mCard[]>([]);

  useEffect(() => {
    if (card) {
      setFilteredProducts(slice ? card.slice(1, 4) : card); // ✅ Show only 4 if slice is true
    }
  }, [card])

  return (
    <div className={className}>
      {card.map((item,key) => {
        const hasVariant = item.attribute && item.attribute.length > 0; // Check if variants exist
        const discountPercentage = item.salePrice
          ? Math.round((item.salePrice / item.price) * 100)
          : null;

        const filteredCategories = item.category.filter((cat) => cat !== "trending");

        return (
          <div
            key={key}
            className="flex items-center border-2 w-full md:w-[282px] p-5 border-[#059DDE] rounded-md relative overflow-hidden"
          >
            <div className="flex flex-col items-center md:justify-center gap-3">
              {/* Sale Badge Logic */}
              {discountPercentage !== null && (
                <div className="absolute top-0 left-0 bg-[#059DDE] flex items-center justify-center w-12 text-white text-xs px-2 py-1">
                  {hasVariant ? "Sale" : `-${discountPercentage}%`}
                </div>
              )}

              {/* Image Hover Effect */}
              <motion.div
                className="relative w-32 h-32 md:w-[250px] md:h-[250px] overflow-hidden"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { opacity: 1 },
                  hover: { opacity: 1 },
                }}
              >
                {/* First Image (Disappears on Hover) */}
                <motion.img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={{
                    rest: { opacity: 1 },
                    hover: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Second Image (Appears from Bottom on Hover) */}
                {item.multiImages?.[0] && (
                  <motion.img
                    src={item.multiImages[0]}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      rest: { opacity: 0, y: 20 },
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>

              {/* Categories */}
              {filteredCategories.map((cat, index) => (
                <p key={index}>{cat}</p>
              ))}

              {/* Title */}
              <h3 className="font-bold text-black md:text-wrap text-wrap md:text-[18px] text-center">
                {item.title}
              </h3>

              {/* Discount Component */}
              <Discount
                discount={item.salePrice ?? 0}
                rate={item.price}
                className=""
                rateClassName="text-[#059DDE] font-bold"
              />

              {/* Buttons */}
              <div className="flex flex-col w-full gap-3">
                {/* <a href={`/product/${item._id}`} className="border-[1px] border-[#059DDE] py-2 text-[#059DDE] text-center">
                  Quick View
                </a> */}
                <a 
                  href={`/product/${item.id}`} 
                  className="border py-2 bg-[#059DDE] text-white text-center"
                >
                  Select Option
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* View All Button */}
      {!slice && (
        <div className="col-span-full flex justify-center py-5">
          <button className="bg-[#059DDE] flex items-center rounded-md px-10 py-2 justify-center text-white text-center">
            View All
          </button>
        </div>
      )}
    </div>
  );
});

export default Card;
