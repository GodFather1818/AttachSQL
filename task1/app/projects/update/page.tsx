import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.category.css';
import { Button } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getParticularProject, updateProject } from '@/utils/api';


function UpdateProject() {
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState('');
  const router = useRouter();


  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          // const response = await axios.get(`http://localhost:3001/project/${id}`);
          // const project = response.data;
          const project = await getParticularProject(id);
          setName(project.name);
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/project/${id}`, { name });
      setTimeout(() => {
        setName('');
        toast.success('Project updated successfully!');
        router.push('/projects');
      }, 2000);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };


  return (
    <div>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Edit Category</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Update Project
        </button>
      </form>
    </div>
    </div>
  )
}

export default UpdateProject;












// <Link href={`/category/edit/${category._id}`}>
{/* <Button className="absolute top-0 right-100 mt-2 mr-2 bg-primary ">
<EditIcon sx={{ color: 'white' }} />
</Button>
</Link> */}