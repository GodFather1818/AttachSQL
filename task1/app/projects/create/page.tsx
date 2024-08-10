"use client";
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function CreateProject() {
    const [name, setName] = useState('');
    const { data: session } = useSession();  // Access the session
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const headers = {
                Authorization: `Bearer ${session?.user.token}`,
            };

            await axios.post('http://localhost:3002/project', { name }, { headers });

            setName('');
            toast.success('Project created successfully!');
            router.push('/projects');
        } catch (error) {
            console.error('Error creating project:', error.response?.data || error.message);
            toast.error('Error creating project!');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField 
                label="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
            />
            <Button type='submit' variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Project
            </Button>
        </Box>
    );
}

export default CreateProject;
