'use client';
import React, { useState, useEffect } from 'react';
import UpdateModal from './UpdateModal';
import { fetchOrders } from '@/graphql/orders';


interface OrderPageProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  shippingAddress: string;
  status: string;
  totalAmount: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderPageProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<OrderPageProps>({
    orderNumber: '',
    customerName: '',
    orderDate: new Date().toISOString().split('T')[0],
    shippingAddress: '',
    status: '',
    totalAmount: 0,
  });

  // Fetch orders when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    
    loadOrders();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const handleAddClick = () => {
    setFormData({
      orderNumber: '',
      customerName: '',
      orderDate: new Date().toISOString().split('T')[0],
      shippingAddress: '',
      status: '',
      totalAmount: 0,
    });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Order Number</th>
            <th className="text-left p-4">Customer Name</th>
            <th className="text-left p-4">Order Date</th>
            <th className="text-left p-4">Shipping Address</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Total Amount</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No orders added yet.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{order.orderNumber}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.orderDate}</td>
                <td className="p-4">{order.shippingAddress}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">Rs {order.totalAmount}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <UpdateModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default OrderPage;
