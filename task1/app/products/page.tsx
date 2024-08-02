"use client"
// pages/products/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.category.css'
import { Button } from '@mui/material';
import Link from 'next/link';

const CategoryPage = () => {
  const [products, setProducts] = useState<Category[]>([]);
  const add = () => {

    console.log('Add Product');
  }

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/prodcut/api/'); // Adjust the endpoint as per your backend route
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <Link href="/products/add"><Button className='btn-add' onClick={add}>Add</Button></Link>
      <div className="grid">
        {products.map(category => (
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
