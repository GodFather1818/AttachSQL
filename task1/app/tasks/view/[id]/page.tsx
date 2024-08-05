"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    _id: string;
    title: string;
    description?: string;
    stage: string;
    due: string;
    assigned_to: string[];
    companyName: string;
    contactName: string;
    createdAt: string;
    updatedAt: string;
}

function ViewDetails() {
    const params = useParams();
    const id = params.id;
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3001/tasks/${id}`);
                    const taskData = response.data;
                    setTask(taskData);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            }
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-[60%] shadow bg-slate-300 p-6'>
                <div className='title-container w-full flex justify-center mb-4'>
                    <h1 className='text-2xl font-bold'>{task.title}</h1>
                </div>
                <div className='description-container w-full flex justify-center mb-4'>
                    <p>{task.description}</p>
                </div>
                <div className='details-container w-full flex flex-col gap-2'>
                    <p><strong>Stage:</strong> {task.stage}</p>
                    <p><strong>Due Date:</strong> {new Date(task.due).toLocaleDateString()}</p>
                    <p><strong>Assigned To:</strong> {task.assigned_to.join(', ')}</p>
                    <p><strong>Company Name:</strong> {task.companyName}</p>
                    <p><strong>Contact Name:</strong> {task.contactName}</p>
                    
                </div>
            </div>
        </div>
    );
}

export default ViewDetails;
