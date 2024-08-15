
"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import withProtectedRoute from '../../lib/withProtectedRoute';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

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
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: Permissions;
}

interface Permissions {
  read: boolean;
  write: boolean;
  create: boolean;
  delete: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    permissions: {
      read: true,
      write: false,
      create: false,
      delete: false,
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/user"); // Fetching all users
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3002/roles/api/get"); // Fetching all users
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleRoleChange = (userId, roleId) => {
    console.log(userId, roleId);
    axios.put(`http://localhost:3002/user/update-role`, { userId, roleId }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchRoles()
    fetchUsers()
  }, [])


  const handleNewUserPermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent changes to the 'read' permission
    if (e.target.name !== 'read') {
      setNewUser({
        ...newUser,
        permissions: {
          ...newUser.permissions,
          [e.target.name]: e.target.checked,
        },
      });
    }
  };



  return (
    <Container>
      <Typography variant="h4" gutterBottom className="mt-8 mb-3">
        Admin Dashboard
      </Typography>
      <Link href={`/admin/users`}>

        <Button className="btn-add text-xs bg-primary text-blue-100 hover:text-black py-2 px-2">
          Roles
        </Button>
      </Link>

      {/* User Management Table */}
      <TableContainer component={Paper} style={{ marginBottom: "2rem", width: "80vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={user.role._id}
                      onChange={(e) => handleRoleChange(user._id, e.target.value as string)}
                      label="Role"
                    >
                      {roles.map((role) => (
                        <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New User Creation Form */}

    </Container>
  );
};

export default withProtectedRoute(AdminDashboard, ['admin', 'user']);
