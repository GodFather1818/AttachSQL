"use client"
// pages/categories/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.category.css'

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/api/'); // Adjust the endpoint as per your backend route
        setCategories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <h1>Categories</h1>
      <div className="grid">
        {categories.map(category =>  (
          <div key={category.id} className="card">
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
 
  );
};

export default CategoryPage;
