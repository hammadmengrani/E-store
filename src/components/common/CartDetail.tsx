import React from "react";
import { useCart } from "@/context/CartContext";

const CartDetail: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div className="p-5 border border-gray-300 w-1/4">
      <h2 className="text-lg font-semibold mb-4">Cart Details</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id + item.selectedAttribute} className="flex justify-between items-center border-b pb-3">
              {/* Product Image */}
              <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />

              {/* Product Details */}
              <div className="flex-1 px-4">
                <h3 className="font-semibold">{item.title}</h3>
                {item.selectedAttribute && <p className="text-sm text-gray-600">Attribute: {item.selectedAttribute}</p>}
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>

              {/* Price */}
              <p className="font-semibold">Rs {(item.price - (item.discount || 0)).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartDetail;
