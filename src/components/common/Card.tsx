'use client'
import React from "react";
import Discount from "./Discount";
import { useCart } from "@/context/CartContext";

export interface mCard {
  _id: string;
  title: string;
  img: string;
  price: number;
  discount?: number;
  quantity:number
  category: string[];
}

export interface cardArray {
  card: Array<mCard>;
}

const Card = (props: cardArray) => {
  const {addToCart} = useCart()

  const handleAddtoCart=(item:mCard)=>{
    addToCart(item)
  }

  return (
    <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 md:grid-cols-4 gap-4 py-5">
      {props.card.map((item, key) => {
        const discountPercentage = item.discount
          ? Math.round((item.discount / item.price) * 100)
          : null;

        return (
          <div
            key={key}
            className="flex items-center border-[2px] w-full md:w-[282px] p-5 border-[#059DDE] rounded-md relative"
          >
            <div className="flex flex-col items-center md:justify-center gap-3">
              {discountPercentage !== null && (
                <div className="absolute top-0 left-0 bg-[#059DDE] flex items-center justify-center w-12 text-white text-xs px-2 py-1 -translate-x-[0%] translate-y-[-1%]">
                  -{discountPercentage}%
                </div>
              )}
              <img
                src={item.img}
                alt={item.title}
                className="w-[250px] h-[250px]"
              />
              {item.category
                .filter((cat) => cat !== "trending")
                .map((cat, index) => (
                  <p key={index}>{cat}</p>
                ))}
              <h3 className="font-bold text-black text-[23px]">{item.title}</h3>
              <Discount
                discount={item.discount ?? 0}
                rate={item.price}
                className=""
                rateClassName="text-[#059DDE] font-bold"
              />
              <div className="flex flex-col w-full gap-3">
                <button className="border-[1px] border-[#059DDE] py-2 text-[#059DDE] text-center">
                  Quick View
                </button>
                <button className="border py-2 bg-[#059DDE] text-white text-center" onClick={()=>handleAddtoCart(item)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-span-full flex justify-center py-5">
        <button className="bg-[#059DDE] flex items-center rounded-md px-10 py-2 justify-center text-white text-center">
          View All
        </button>
      </div>
    </div>
  );
};

export default Card;
