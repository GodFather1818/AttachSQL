"use client";

import { getParticularTask } from '@/utils/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Task } from '../../../../../backend/src/task/task.schema';

function ViewDetails() {

    const params = useParams();
    const id = params.id;
    const [task, setTask] = useState<Task | null>(null)
    const [loading, setLoading] = useState(true);


    useEffect(()=>{ 
        const fetchTask = async () => {
            if (id) {
              try {
                const response = await getParticularTask(id as string); 
                const task = response.data;
                setTask(task.name);
              } catch (error) {
                console.error('Error fetching project:', error);
              } finally {
                setLoading(false); // Set loading to false after fetching
              }
            }
          };
      
          fetchTask();
        }, [id]);

        if (!task) return <div>Loading...</div>;

  return (
    <div className='w-full h-screen'>
        <div className='w-[60%] shadow bg-slate-300'>
            <div className='title-container w-full flex justify-center' >

            </div>

        </div>
      
    </div>
  )
}

export default ViewDetails;
function async(arg0: string) {
    throw new Error('Function not implemented.');
}

