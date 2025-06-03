'use client';
import React, { ChangeEvent } from 'react';

interface UpdateModalProps {
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  formData,
  setFormData,
  onClose,
  onSave
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev: any) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />


        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Categroy (comma separated)"
          value={formData.category}
          onChange={(e) => {
            const category = e.target.value.split(',').map((cat) => cat.trim());
            setFormData((prev: any) => ({ ...prev, category }));
          }}
          className="w-full border p-2 rounded"
        />


        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="space-y-2">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
