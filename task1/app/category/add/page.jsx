"use client"
// components/AddCategoryForm.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3002/category/api/add', { name, description });
      setName('');
      setDescription('');
      alert('Category added successfully!');
      router.push('/category');
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form border rounded-lg m-10">
      <h2 className='mt-10 text-3xl font-bold'>Add New Category</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group mt-10 mb-5">
        <label htmlFor="name" className='text-xl font-semibold'>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className='text-xl font-semibold'>Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button className='mb-5' type="submit" disabled={loading}>
        {loading ? 'Adding...' : '+ Add Category'}
      </button>
      <style jsx>{`
        .category-form {
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-top:2rem;
          width: 100%;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input,
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .error {
          color: red;
        }
      `}</style>
    </form>
  );
};

export default AddCategoryForm;
