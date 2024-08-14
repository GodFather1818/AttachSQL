
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

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(`http://localhost:3002/user/update-role/${userId}`, {
        role: newRole,
      });
      fetchUsers(); // Refresh the user list after updating the role
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handlePermissionChange = async (userId: string, permissions: Permissions) => {
    try {
      await axios.patch(`http://localhost:3002/user/permissions/${userId}`, {
        permissions: permissions,
      });
      fetchUsers(); // Refresh the user list after updating the permissions
    } catch (error) {
      console.error("Error updating user permissions:", error);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleCreateNewUser = async () => {
    try {
      await axios.post("http://localhost:3002/user/register", newUser);
      fetchUsers(); // Refresh the user list after creating a new user
      setNewUser({
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
    } catch (error) {
      console.error("Error creating new user:", error);
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
      <TableContainer component={Paper} style={{ marginBottom: "2rem", width:"80vw"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
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
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value as string)}
                      label="Role"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.permissions.read}
                        onChange={(e) =>
                          handlePermissionChange(user._id, {
                            ...user.permissions,
                            read: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Read"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.permissions.write}
                        onChange={(e) =>
                          handlePermissionChange(user._id, {
                            ...user.permissions,
                            write: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Write"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.permissions.create}
                        onChange={(e) =>
                          handlePermissionChange(user._id, {
                            ...user.permissions,
                            create: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Create"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.permissions.delete}
                        onChange={(e) =>
                          handlePermissionChange(user._id, {
                            ...user.permissions,
                            delete: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Delete"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRoleChange(user._id, "admin")}
                  >
                    Set Admin
                  </Button>
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

export default withProtectedRoute(AdminDashboard, ['admin']);
