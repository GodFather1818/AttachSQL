
"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import withProtectedRoute from '../../lib/withProtectedRoute';
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
      <Typography variant="h5" gutterBottom>
        Create New User
      </Typography>
      <form noValidate autoComplete="off" style={{ marginBottom: "2rem" }}>
        <TextField
          label="Name"
          name="name"
          value={newUser.name}
          onChange={handleNewUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleNewUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleNewUserChange}
          fullWidth
          margin="normal"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as string })}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked = {newUser.permissions.read}
                onChange={handleNewUserPermissionChange}
                name="read"
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.permissions.write}
                onChange={handleNewUserPermissionChange}
                name="write"
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.permissions.create}
                onChange={handleNewUserPermissionChange}
                name="create"
              />
            }
            label="Create"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.permissions.delete}
                onChange={handleNewUserPermissionChange}
                name="delete"
              />
            }
            label="Delete"
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleCreateNewUser}>
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default withProtectedRoute(AdminDashboard, ['admin']);
