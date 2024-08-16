"use client";


import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";
import { 
    Container, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, Typography, IconButton 
  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Page() {
    const [roles, setRoles] = useState([]);
    const fetchRoles = async () => {
        try {
          const response = await axios.get("http://localhost:3002/roles/api/get");
          setRoles(response.data);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
    
    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = async (id) =>{
      console.log(id)
        try {
            await axios.delete(`http://localhost:3002/roles/api/delete/${id}`);
            setRoles(roles.filter((role)=>role._id!==id))
            fetchRoles();
          } catch (error) {
            console.error("Error deleting role:", error);
          }

    }

  return (
    <div>
      <Container>
      <Typography variant="h4" gutterBottom className="mt-8 mb-3">
        Roles Management
      </Typography>
      
      <TableContainer component={Paper} style={{ marginBottom: "2rem", width: "80vw" }}>
        <Table>
          <TableHead>
            <TableRow>
               
                    <TableCell>Role Name</TableCell>
                    <TableCell>Actions</TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <div className='flex justify-around'>
                  <Link href={`/admin/roles/${role._id}`}>
                    <Button>View Permissions</Button>
                  </Link>
                  <Link href={`/admin/roles/edit/${role._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                    <IconButton>
                      <DeleteIcon sx={{ color: 'red' }} onClick={()=>{handleDelete(role._id)}} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link href="/admin/users">
        <Button className="btn-add text-xs bg-primary text-blue-100 hover:text-black py-2 px-2">
          Create New Role
        </Button>
      </Link>
    </Container>
    </div>
  )
}

export default Page;
