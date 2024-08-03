"use client"
// components/AddProductForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.add.css'

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

  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/api/'); // Example API endpoint
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
      await axios.post('http://localhost:3001/product/api/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="sellingPrice">Selling Price</label>
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
          onChange={(e) => setBannerImage(e.target.files[0])}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm;