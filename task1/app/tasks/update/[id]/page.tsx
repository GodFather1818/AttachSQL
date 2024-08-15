"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { getParticularTask, updateTask, TaskCreateDto } from '@/utils/api'; // Ensure these functions are properly defined in utils/api.ts
import { useSession } from "next-auth/react";
import axios from "axios";

const UpdateTask = () => {
    const router = useRouter();
    const params = useParams();
    const taskId = params.id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [due, setDue] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const {data:session} = useSession();
    const permissions = session?.user?.permissions.category;
    console.log(permissions);
    const token = session?.user.token;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        if (taskId) {
            axios.get(`http://localhost:3002/tasks/${taskId}`, { headers }).then(response  => {
                const task = response.data;
                setTitle(task.title);
                setDescription(task.description || '');
                setStage(task.stage);
                setDue(new Date(task.due).toISOString().substring(0, 10)); // format date to yyyy-mm-dd
                setAssignedTo(task.assigned_to.join(', '));
                setCompanyName(task.companyName);
                setContactName(task.contactName);
            }).catch(error => {
                console.error('Error fetching task:', error);
                toast.error('Failed to fetch task');
            });
        }
    }, [taskId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3002/tasks/${taskId}`, {
                title,
                description,
                stage,
                due: new Date(due),
                assigned_to: assignedTo.split(',').map(str => str.trim()),
                companyName,
                contactName
            }, { headers });
            
            setTimeout(() => {
                toast.success('Task updated successfully!');
                router.push('/tasks');
            }, 2000);
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task');
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3, maxWidth: 500, width: '100%' }}
                autoComplete="off"
            >
                <Typography variant="h4" gutterBottom className="mt-[9rem] w-full flex justify-center">
                    Update Task
                </Typography>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    label="Stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Due Date"
                    type="date"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Assigned To (comma separated)"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Contact Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} className='mb-[3rem]'>
                    Update Task
                </Button>
            </Box>
        </div>
    );
};

export default UpdateTask;
