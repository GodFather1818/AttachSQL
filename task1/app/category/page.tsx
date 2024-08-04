"use client"
// pages/categories/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.category.css'
import { Button } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category } from "../../../backend/src/category/category.schema";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const add = () => {
    console.log('Add category');
  }

  const deleteit = async (id:any) => {
    try{
      await axios.delete(`http://localhost:3001/category/api/delete/${id}`);
      fetchCategories();
    }catch(error){
      console.log(error);
    }
    console.log('Delete category');
  }
  const editit = async (id:any) => {
    try{
      await axios.delete(`http://localhost:3001/category/api/edit/${id}`);
      fetchCategories();
    }catch(error){
      console.log(error);
    }
    console.log('Edit category');
  }

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
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-10 container mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
      <div className=' flex justify-between items-center h-16 m-4'>
        <h1 className='text-3xl font-bold text-primary'>Categories</h1>
        <Link href="/category/add"><Button className='btn-add' onClick={add}>+ Add new categories</Button></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category =>  (
          <div key={category.id} className="flex space-around relative card bg-slate-100 shadow-md rounded-lg p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Button onClick={()=>{deleteit(category._id)}} className="absolute top-0 right-0 mt-2 mr-2 bg-primary "><DeleteIcon sx={{ color: 'red' }}/></Button>
            <Button onClick={()=>{editit(category._id)}} className="absolute top-0 right-100 mt-2 mr-2 bg-primary "><EditIcon sx={{ color: 'red' }}/></Button>
            <div className='flex-col justify-center items-center w-80 m-auto'>
            <h2 className='font-semibold text-blue-500 text-2xl m-3 '>{category.name}</h2>
            <p className='text-blue-900'>{category.description}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
 
  );
};

export default CategoryPage;
