"use client"

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import withProtectedRoute from '../../lib/withProtectedRoute';
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "@/components/ui/Layout";
import io from 'socket.io-client';
import Toast from '@/components/ui/Toast';


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
  } | null;
}

interface Role {
  _id: string;
  name: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const socketRef = useRef(null);  // Use useRef to ensure the socket is not reinitialized
  const [toast, setToast] = useState({ message: '', type: 'info', show: false });
  const socket = io('http://localhost:3002'); 

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
  };
  
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

 useEffect(()=> {
  socket.on('roleUpdated', (role)=> {
    showToast(`Role Updated to ${role.name}`, "success");
  });

  return () => {
    socket.off('roleUpdated');
  }

 }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3002/roles/api/get");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleRoleChange =async  (userId: string, roleId: string) => {
    try {
      const role = await axios.put(`http://localhost:3002/user/update-role`, { userId, roleId });
      fetchUsers();
      
    } catch (error) {
      console.log(error);
      showToast("Failed to update role.", "error");
    }};



  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-4">
          <Link href="/admin/roles">
            <Button variant="default" className="text-xs">
              Manage Roles
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role?._id || ""}
                      onValueChange={(value) => handleRoleChange(user._id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role._id} value={role._id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      </div>
    </Layout>
  );
};

export default withProtectedRoute(AdminDashboard, ['admin']);
// export default AdminDashboard;