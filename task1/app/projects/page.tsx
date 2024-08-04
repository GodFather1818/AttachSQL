"use client";

import React from 'react'
import { useState, useEffect } from "react";
import { getProjects } from '@/utils/api';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { Project } from '../../../backend/src/project/project.schema';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectList = () => {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(()=> {
    const fetchProjects = async () =>{ 
      const data = await getProjects();
      setProjects(data);
    } 

    fetchProjects();
  }, [])


  return (
    <div>
    {projects.length !== 0 ? (
      <div className="mt-10 container mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
        <div className="flex justify-between items-center h-16 m-4">
          <h1 className="text-3xl font-bold text-primary">PROJECTS</h1>
          <Link href="/projects/create">
            <Button className="btn-add p-3 bg-primary text-blue-100">+ Add new PROJECTS</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="relative card bg-slate-100 shadow-md rounded-lg p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <Button className="absolute top-0 right-0 mt-2 mr-2 bg-primary">
                <DeleteIcon sx={{ color: 'red' }} />
              </Button>
              <h2 className="font-semibold text-blue-500 text-2xl m-3"></h2>
              <p className="text-blue-900">{project.name}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <h1>No Projects added in the database!</h1>
    )}
  </div>
    // </div>
  )
}

export default ProjectList;
