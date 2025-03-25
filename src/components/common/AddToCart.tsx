import { useCart } from '@/context/CartContext';
import React from 'react';
import Discount from './Discount';

interface AddToCartProps {
  onClose: () => void; // Accept onClose as a prop
}

const AddToCart: React.FC<AddToCartProps> = ({ onClose }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart(); // Access cartItems and quantity functions from context

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount ? (item.price - item.discount) : item.price; // Apply discount if available
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const MovetoCart = () =>{
    window.location.href = '/cart'
  }

  const MovetoCheckout = () =>{
    window.location.href = '/checkout'
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between p-5 items-center sticky top-0 bg-white z-10">
        <h3>SHOPPING CART</h3>
        <button className="p-2" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col p-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between  items-center border-b py-2">
              <div className="flex items-center">
                {item.img && <img src={item.img} alt={item.title} className="h-16 w-16 object-cover mr-2" />}
                <div className='flex flex-col gap-2'>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className='text-sm font-light text-nowrap'>{item.selectedAttribute}</p>
                  <div className="flex items-center">
                    <button onClick={() => decrementQuantity(item.id,item.selectedAttribute)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id,item.selectedAttribute)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                    <button onClick={() => removeFromCart(item.id,item.selectedAttribute)} className="ml-4 text-red-500">Delete</button>
                  </div>
                </div>
              </div>
              <Discount discount={item.discount} rate={item.price} className='flex-wrap justify-end' rateClassName='flex items-center justify-end' />
            </div>
          ))
        )}
      </div>

      <div className="p-5 border-t">
        <div className='flex items-center justify-between'>
        <h4 className="font-semibold">Total: </h4>
        <span>Rs. {calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={MovetoCart} className="px-4 py-2 bg-blue-500 text-white rounded">View Cart</button>
          <button onClick={MovetoCheckout} className="px-4 py-2 bg-green-500 text-white rounded">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
