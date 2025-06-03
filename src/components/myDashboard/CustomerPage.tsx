import React, { useState, useEffect } from 'react';
import { fetchCustomers } from '@/graphql/customer';  // Make sure to import the fetchCustomers function

interface PurchasedProduct {
  productId: string;
  title: string;
  category: string[];
  price: number;
  purchaseDate: string;
}

interface Customer {
  id: string;  // Assuming each customer has a unique ID
  customerName: string;
  phone: number;
  city: string;
  country: string;
  orders: number;
  total_spend: number;
  purchasedProducts?: PurchasedProduct[];  // Make purchased_products optional
  email: string;
  aov: number;

}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);  // State to store fetched customers
  const [loading, setLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCustomers = await fetchCustomers();  // Fetch customer data
        setCustomers(fetchedCustomers.map(customer => ({
          ...customer,
          total_spend: customer.totalSpend, // Map totalSpend to total_spend
        })));  // Update state with transformed data
      } catch (err) {
        setError('Failed to fetch customer data');  // Set error message if the fetch fails
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);  // Stop loading once the data is fetched
      }
    };

    fetchData();  // Call fetchData when the component mounts
  }, []);  // Empty dependency array means this effect runs only once

  if (loading) return <div>Loading...</div>;  // Show loading message if data is still being fetched
  if (error) return <div>{error}</div>;  // Show error message if there's an error

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      
      {/* Loop through each customer and display their details */}
      {customers.map((customer) => (
        <div key={customer.id} className="mb-8">
          <h3 className="text-xl font-semibold">{customer.customerName}</h3>

          {/* Customer Info Table */}
          <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Orders</th>
                <th className="border p-2">Total Spend</th>
                <th className="border p-2">AOV</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{customer.customerName}</td>
                <td className="border p-2">{customer.phone}</td>
                <td className="border p-2">{customer.city}</td>
                <td className="border p-2">{customer.country}</td>
                <td className="border p-2">{customer.orders}</td>
                <td className="border p-2">Rs {customer.total_spend}</td>
                <td className="border p-2">Rs {customer.aov}</td>
                <td className="border p-2">{customer.email}</td>
              </tr>
            </tbody>
          </table>

          {/* Purchased Products Table */}
          <h3 className="text-xl font-semibold mt-8">Purchased Products</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border p-2">Product Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if purchased_products is defined and map over it */}
              {(customer.purchasedProducts ?? []).map((product) => (
                <tr key={product.productId}>
                  <td className="border p-2">{product.title}</td>
                  <td className="border p-2">{product.category.join(', ')}</td>
                  <td className="border p-2">Rs {product.price}</td>
                  <td className="border p-2">{new Date(product.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CustomerPage;
