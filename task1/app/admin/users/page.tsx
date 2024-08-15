"use client"
import axios from 'axios';
import { useState } from 'react';

const NewUserPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
  const [products, setProducts] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
  const [projects, setProjects] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
  const [tasks, setTasks] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, category, products, projects, tasks };
    console.log('Submitting newUser:', newUser); // Debugging line
    try {
      const response = await axios.post('http://localhost:3002/roles/api/add', newUser);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategory((prevState) => {
      const newState = { ...prevState, [name]: checked };
      console.log('Updated Category State:', newState); // Debugging line
      return newState;
    });
  };

  const handleProductsChange = (e) => {
    const { name, checked } = e.target;
    setProducts((prevState) => {
      const newState = { ...prevState, [name]: checked };
      console.log('Updated Products State:', newState); // Debugging line
      return newState;
    });
  };

  const handleProjectsChange = (e) => {
    const { name, checked } = e.target;
    setProjects((prevState) => {
      const newState = { ...prevState, [name]: checked };
      console.log('Updated Projects State:', newState); // Debugging line
      return newState;
    });
  };

  const handleTasksChange = (e) => {
    const { name, checked } = e.target;
    setTasks((prevState) => {
      const newState = { ...prevState, [name]: checked };
      console.log('Updated Tasks State:', newState); // Debugging line
      return newState;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Role</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Category Permissions</label>
          {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
            <div key={perm} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${perm}`}
                name={perm}
                checked={category[perm]}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              <label htmlFor={`category-${perm}`} className="text-sm">{perm}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Products Permissions</label>
          {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
            <div key={perm} className="flex items-center">
              <input
                type="checkbox"
                id={`products-${perm}`}
                name={perm}
                checked={products[perm]}
                onChange={handleProductsChange}
                className="mr-2"
              />
              <label htmlFor={`products-${perm}`} className="text-sm">{perm}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Projects Permissions</label>
          {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
            <div key={perm} className="flex items-center">
              <input
                type="checkbox"
                id={`projects-${perm}`}
                name={perm}
                checked={projects[perm]}
                onChange={handleProjectsChange}
                className="mr-2"
              />
              <label htmlFor={`projects-${perm}`} className="text-sm">{perm}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Tasks Permissions</label>
          {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
            <div key={perm} className="flex items-center">
              <input
                type="checkbox"
                id={`tasks-${perm}`}
                name={perm}
                checked={tasks[perm]}
                onChange={handleTasksChange}
                className="mr-2"
              />
              <label htmlFor={`tasks-${perm}`} className="text-sm">{perm}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewUserPage;