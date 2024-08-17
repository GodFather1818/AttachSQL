"use client";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/roles/api/delete/${id}`);
      setRoles(roles.filter((role) => role._id !== id));
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
                        <Button className='background-color: transparent,border: none; ;'>
                          <FontAwesomeIcon icon={faPen} className="mr-2 "  />
                      
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(role._id)}
                        className="text-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Link href="/admin/users">
          <Button className="text-xs bg-primary text-blue-100 hover:text-black py-2 px-2">
            Create New Role
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
