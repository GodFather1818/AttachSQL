"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { createTask, TaskCreateDto } from '@/utils/api'; // Ensure this function is properly defined in utils/api.ts
import axios from "axios";
import { useSession } from "next-auth/react";


const CreateTask = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [due, setDue] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const { data: session } = useSession();

    const token = session?.user.token;
    const permissions = session?.user?.permissions;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
            const newTask: TaskCreateDto = {
                title,
                description,
                stage,
                due: new Date(due),
                assigned_to: assignedTo.split(',').map(str => str.trim()),
                companyName,
                contactName
            };
            try {
                await axios.post("http://localhost:3002/tasks",newTask,{headers});
                toast.success('Task created successfully!');
                setTimeout(() => {
                    router.push('/tasks');
                }, 2000);
            } catch (error) {
                console.error('Error creating task:', error);
                toast.error('Failed to create task');
            }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3, maxWidth: 500, width: '100%' }}
             
            >
                <Typography variant="h4" gutterBottom>
                    Create New Task
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Task
                </Button>
            </Box>
        </div>
    );
};

export default CreateTask;
