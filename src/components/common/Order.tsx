'use client';
import { fetchLastOrder } from "@/graphql/orders";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const getOrders = async () => {
      const lastOrder = await fetchLastOrder();
      console.log(lastOrder)
      if (lastOrder) {
        setOrder(lastOrder);
      }
    };
    getOrders();
  }, []);

  if (!order) {
    return <p className="text-center">Loading Order Details...</p>;
  }

  const shippingAddress = {
    address: order.address || "N/A",
    city: order.city || "N/A",
    postal: order.postalCode || "N/A",
  };

  return (
    <div className="flex md:w-[56%] flex-col gap-2 py-5 justify-center px-1 md:px-5">
      <p className="text-[13px] text-gray-400">Order #{order.orderNumber}</p>
      <span className="text-[23px] font-bold">Thank You {order.customerName}</span>
      <div className="flex flex-col gap-3 border-2 border-dotted border-[#059DDE]">
        <div className="flex flex-col gap-3 p-5 text-center">
          <h3 className="text-[18px] font-medium">Your Order has been confirmed</h3>
          <p className="text-[14px]">
            You will receive a confirmation email with your order number shortly.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 border p-5">
        <h3 className="text-[20px] font-medium">Order Details</h3>
        <div className="flex flex-col md:flex-row md:gap-0 gap-3 md:justify-between">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold">Contact Information</h3>
            <p className="text-[14px]">{order.email}</p>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[16px] font-bold">Payment Method</h3>
            <p className="text-[14px]">Cash On Delivery</p>
          </div>
        </div>
        <div className="flex flex-col md:gap-0 gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col md:w-[214px]">
            <h3 className="text-[16px] font-bold">Shipping Address</h3>
            <p className="text-[14px]">{order.customerName}</p>
            <p className="text-[14px]">{shippingAddress.address}</p>
            <p className="text-[14px]">{shippingAddress.city}</p>
            {shippingAddress.postal && (
                <p className="text-[14px]">{shippingAddress.postal}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold">Shipping Method</h3>
            <p className="text-[14px]">FREE</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-[14px] w-full items-center">
        <span className="text-gray-400">Need help? <a className="text-blue-600" href="/contact">Contact Us</a></span>
        <button 
          className="bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = "/"}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Order;
