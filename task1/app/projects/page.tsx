"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "../../utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatabble";
import axios from "axios";
import { useSession } from "next-auth/react";
import EditIcon from '@mui/icons-material/Edit';
function ProjectList() {
  const [projects, setProjects] = useState([]);

  const {data:session} = useSession();
  const permissions = session?.user?.permissions.projects;
  console.log(permissions);
  const token = session?.user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
};


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Ensure token is correctly extracted from session
        if (!token) {
          throw new Error("Token not found");
        }


        const { data } = await axios.get("http://localhost:3002/project", { headers });
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [session]);

  const handleDelete = async (id: any) => {
    try {
     await axios.delete(`http://localhost:3002/project/${id}`, {headers});
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Project name",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions", // Changed from "delete" to "actions" to cover both edit and delete actions
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {permissions?.DELETE && (
            <Button onClick={() => handleDelete(row.original._id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </Button>
          )}
          {permissions?.WRITE && (
            <Link href={`/projects/update/${row.original._id}`}>
              <Button>
                <EditIcon sx={{ color: "blue" }} />
              </Button>
            </Link>
          )}
        </div>
      ),
    },
  ];
  

  return (
    <div className="m-6">
      <div className="flex justify-between items-center h-16 mb-5">
        <h1 className="text-2xl font-bold text-primary">PROJECTS</h1>
   
        {permissions?.CREATE && (
          <Link href="/projects/create">
            <Button className="btn-add text-xs bg-primary text-blue-100">+ Add new PROJECTS</Button>
          </Link>
        )}
       
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
}

export default ProjectList;
