'use client';
import React, { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal';

interface ProductPageProps {
  products: {
    title: string;
    sku: string;
    stock: number;
    price: number;
    category: string[];
    tags: string[];
    brand: string;
    description: string;
    imageUrl: string;
    dateAdded: string;
  }[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductPageProps['products'][0]>({
    title: '',
    sku: '',
    stock: 0,
    price: 0,
    category: [],
    tags: [],
    brand: '',
    description: '',
    imageUrl: '',
    dateAdded: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    setProducts(products);
  }, [products]);

  // Update props mapping from API response
  const mapProductData = (product: any) => ({
    name: product.title,
    sku: product.id,
    stock: product.stock,
    price: product.salePrice / 100,  // Assuming salePrice is in cents, adjust accordingly
    category: product.category || [],  // Ensure it's an array
    tags: [],  // You can leave this empty or fill it with any relevant data if available
    brand: '',  // Adjust this based on your data if you have brand information
    description: product.description,
    image: product.imageUrl,
    dateAdded: new Date().toISOString().split('T')[0],  // Use the actual date if available
  });

  const handleAddClick = () => {
    setFormData({
      title: '',
      sku: '',
      stock: 0,
      price: 0,
      category: [],
      tags: [],
      brand: '',
      description: '',
      imageUrl: '',
      dateAdded: new Date().toISOString().split('T')[0],
    });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (index: number) => {
    const product = _products[index];
    setFormData(product);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Update product
      const updatedProducts = [..._products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts((prev) => [...prev, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const updatedProducts = _products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Image</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Stock</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Categories</th>

            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {_products.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center p-4 text-gray-500">
                No products added yet.
              </td>
            </tr>
          ) : (
            _products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt="Product"
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="p-4">{product.title}</td>
                <td className="p-4">{product.stock} units</td>
                <td className="p-4">Rs {product.price}</td>
                <td className="p-4">{product.category.join(', ')}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
                  >
                    Update
                  </button>
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
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductPage;
