"use client"
// pages/products/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.category.css'
import { Button } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div className="w-full container m-5 border rounded-lg align-middle p-10 mx-auto  bg-gradient-to-r from-blue-100 to-blue-200 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
      <div className='flex justify-between items-center mt-3 mb-10'>
        <h1 className='text-5xl text-center text-primary font-bold '>Products</h1>
        <Link href="/products/add"><Button className='btn-add p-3 text-lg bg-primary text-white hover:bg-blue-100 hover:text-blue-950 border rounded-lg' onClick={add}>+ Add Product</Button></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {products.map(product => (
          <div key={product.id} className="card relative bg-slate-100 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Button onClick={() => { }} className="absolute bottom-0 right-0 mb-2 mr-2 bg-primary">
              <DeleteIcon sx={{ color: 'red' }} />
            </Button>
            <img className="image-container h-48 w-full flex items-center justify-center bg-gray-200"
 src={`http://localhost:3001/${product.bannerImage}`} alt={product.name} />
            <h2 className='font-bold text-blue-900 text-2xl m-5'>{product.name}</h2>
            <h3 className='font-semibold text-blue-500 text-lg m-1'>Category: {product.category}</h3>
            <p className='text-blue-900'>Description: {product.description}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default CategoryPage;
