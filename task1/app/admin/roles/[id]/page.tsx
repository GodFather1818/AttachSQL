"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter, useParams} from 'next/navigation';
import { 
  Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Checkbox 
} from '@mui/material';

const RolePermissionsPage = () => {

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

  

  if (!role) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="mt-8 mb-3">
        Permissions for {role.name}
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
                <TableCell><b>{category}</b></TableCell>
                <TableCell><Checkbox checked={permissions.CREATE} disabled /></TableCell>
                <TableCell><Checkbox checked={permissions.READ} disabled /></TableCell>
                <TableCell><Checkbox checked={permissions.UPDATE} disabled /></TableCell>
                <TableCell><Checkbox checked={permissions.DELETE} disabled /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RolePermissionsPage;