"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Project } from "../../../backend/src/project/project.schema";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "../../utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatabble";
import axios from "axios";
import { useSession } from "next-auth/react";

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { data: session } = useSession();

  const Userrole = session?.user.role;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Ensure token is correctly extracted from session
        const token = session?.user.token;
        if (!token) {
          throw new Error("Token not found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

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
      await deleteProject(id);
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
      id: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <div>
          {Userrole === "ADMIN" && (
            <Button onClick={() => handleDelete(row.original._id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="m-6">
      <div className="flex justify-between items-center h-16 mb-5">
        <h1 className="text-2xl font-bold text-primary">PROJECTS</h1>
        {Userrole === "admin" && (
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
