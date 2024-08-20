"use client";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";
import io from 'socket.io-client';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
// import { Button } from "../../../components/ui/button";
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Toast from '@/components/ui/Toast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Page() {
  const [roles, setRoles] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'info', show: false });
   // Use useRef to ensure the socket is not reinitialized


  const socket = io('http://localhost:3002'); 

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3002/roles/api/get");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      showToast("Error fetching roles", "error");
    }
  };

  useEffect(() => {
    // Listen for role added event
    socket.on('roleAdded', (role) => {
      showToast(`${role.name} has been added to roles.`, "success");
    });

    // Listen for user assigned to role event
    socket.on('userAssignedToRole', ({ userId, role }) => {
      showToast(`User ${userId} has been assigned to ${role.name}.`, "info");
    });

    socket.on('roleDeleted', (role) => {
      showToast(`Role:- ${role.name} has been deleted.`, "error");
    })

    return () => {
      socket.off('roleAdded');
      socket.off('userAssignedToRole');
      socket.off('roleDeleted');
    };
  }, []);

  // function handleDeleteNotifications(role) {
  //   socket.on('roleDeleted', ({role}) => {
  //     showToast(`Role:- ${role.name} has been deleted.`, "info");
  //   })
  //   socket.off('roleDeleted');
  // } 

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/roles/api/delete/${id}`);
      setRoles(roles.filter((role) => role._id !== id));
      // handleDeleteNotifications(roles.filter((role)=> role._id === id))
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  
  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mt-8 mb-3">
          Roles Management
        </h2>

        <div className="overflow-x-auto mb-8">
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableHeader>Role Name</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-around">
                      <Link href={`/admin/roles/${role._id}`}>
                        <Button>
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          View Permissions
                        </Button>
                      </Link>
                      <Link href={`/admin/roles/edit/${role._id}`}>
                        <Button className='' >
                          <EditIcon />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(role._id)}
                        className="text-red-500"
                      >
                        <DeleteIcon  sx={{ color: 'red' }}  />
                        
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
            <div className='border-blue-500 '>

        <Link href="/admin/users" className=''>
          <Button className="text-xs bg-primary text-blue-100 hover:text-black py-2 px-2 ">
            Create New Role
          </Button>
        </Link>
            </div>
      </div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}

export default Page;
