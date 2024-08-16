"use client"
// components/AddProductForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.add.css'
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';
import { useSession } from "next-auth/react";

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [tags, setTags] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const {data:session} = useSession();
  const permissions = session?.user?.permissions.products;
  console.log(permissions);
  const token = session?.user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size should be less than 5MB');
      return;
    }
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPEG or PNG files are allowed');
      return;
    }
    setBannerImage(file);
  };
  
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3002/category/api', {headers}); // Example API endpoint
        setCategories(response.data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('sellingPrice', sellingPrice);
    formData.append('actualPrice', actualPrice);
    formData.append('tags', tags);
    formData.append('bannerImage', bannerImage);
    formData.append('category', category);

    try {
      await axios.post('http://localhost:3002/product/api/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setName('');
      setDescription('');
      setSellingPrice('');
      setActualPrice('');
      setTags('');
      setBannerImage(null);
      setCategory('');

      alert('Product added successfully!');
      setTimeout(()=>{
        toast.success('Product created successfully!');
        router.push('/products');
    }, 2000);
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <div className=" mx-auto align-middle p-6 bg-gradient-to-r from-blue-100 to-blue-200 border rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
        <form onSubmit={handleSubmit} >
      
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="description"  className="block text-lg font-medium mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        
        ></textarea>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="sellingPrice" className="block text-lg font-medium mb-2">Selling Price</label>
        <input
          type="number"
          id="sellingPrice"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="actualPrice">Actual Price</label>
        <input
          type="number"
          id="actualPrice"
          value={actualPrice}
          onChange={(e) => setActualPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bannerImage">Banner Image</label>
        <input
  type="file"
  id="bannerImage"
  onChange={handleFileChange}
  required
/>

      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
    </div>

    
  );
};

export default AddProductForm;