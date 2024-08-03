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
        const response = await axios.get('http://localhost:3001/product/api/'); // Adjust the endpoint as per your backend route
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
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={`http://localhost:3001/${product.bannerImage}`} alt={product.name} style={{
              margin:'auto',
              width:'30%'}}/>
            <h2>{product.name}</h2>
            <h3>Category:{product.category}</h3>
            <p>Description:{product.description}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default CategoryPage;
