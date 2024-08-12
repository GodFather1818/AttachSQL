// AdminPanel.tsx
"use client"
import React, { useEffect, useState } from "react";
import withProtectedRoute from '../../lib/withProtectedRoute';
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(`http://localhost:3002/user/role/${userId}`, {
        role: newRole,
      });
      fetchUsers(); 
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <InputLabel id={`role-select-label-${user._id}`}>
                      Role
                    </InputLabel>
                    <Select
                      labelId={`role-select-label-${user._id}`}
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value as string)
                      }
                      label="Role"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default withProtectedRoute(AdminPanel, ['admin']);
