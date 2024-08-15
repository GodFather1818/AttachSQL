"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { 
  Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Checkbox, Button 
} from '@mui/material';


function page() {
    const router = useRouter();
    const params = useParams();

    const  id  = params.id;  

    const [role, setRole] = useState(null);
    const fetchRolePermissions = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/roles/api/get/${id}`);
          setRole(response.data);
        } catch (error) {
          console.error("Error fetching role permissions:", error);
        }
      };

      useEffect(() => {
        if (id) {
          fetchRolePermissions();
        }
      }, [id]);

      const handlePermissionChange = (category, permission) => {
        setRole(prevRole => ({
          ...prevRole,
          [category]: {
            ...prevRole[category],
            [permission]: !prevRole[category][permission]
          }
        }));
      };


      const handleSubmit = async () => {
        try {
          await axios.put(`http://localhost:3002/roles/api/update/${id}`, role);
          router.push('/admin/roles');
        } catch (error) {
          console.error("Error updating role:", error);
        }
      };

      if (!role) return <div>Loading...</div>;



    return (
    <div>
      <Container>
      <Typography variant="h4" gutterBottom className="mt-8 mb-3">
        Edit Permissions for {role.name}
      </Typography>
      
      <TableContainer component={Paper} style={{ marginBottom: "2rem", width: "80vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Modules</b></TableCell>
              <TableCell><b>CREATE</b></TableCell>
              <TableCell><b>READ</b></TableCell>
              <TableCell><b>UPDATE</b></TableCell>
              <TableCell><b>DELETE</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(role).filter(([key]) => key !== '_id' && key !== 'name' && key !== "__v").map(([category, permissions]) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell>
                  <Checkbox 
                    checked={permissions.CREATE} 
                    onChange={() => handlePermissionChange(category, 'CREATE')} 
                  />
                </TableCell>
                <TableCell>
                  <Checkbox 
                    checked={permissions.READ} 
                    onChange={() => handlePermissionChange(category, 'READ')} 
                  />
                </TableCell>
                <TableCell>
                  <Checkbox 
                    checked={permissions.UPDATE} 
                    onChange={() => handlePermissionChange(category, 'UPDATE')} 
                  />
                </TableCell>
                <TableCell>
                  <Checkbox 
                    checked={permissions.DELETE} 
                    onChange={() => handlePermissionChange(category, 'DELETE')} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Save Changes
      </Button>
    </Container>
    </div>
  )
}

export default page
