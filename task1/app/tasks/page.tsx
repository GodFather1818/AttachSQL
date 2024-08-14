"use client";

import React from "react";
import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask } from "@/utils/api";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TableClassKey,
} from "@mui/material";
import { Task } from "../../../backend/src/task/task.schema";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteProject } from "../../utils/api";
import axios from "axios";
import {useRouter} from 'next/navigation';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatabble";
import { useSession } from "next-auth/react";

function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const router = useRouter();
  const { data: session } = useSession();
  const permissions = session?.user?.permissions;
  const token = session?.user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
};
  useEffect(() => {
    const fetchTasks = async () => {

      try {
        
        const {data} = await axios.get("http://localhost:3002/tasks", { headers });
        setTasks(data);

      } catch (error) {
        console.error("Error Fetching Tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3002/tasks/${id}`, { headers });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = async(id: any) => {
    router.push(`/tasks/view/${id}`);
  }

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Task title',
      cell: ({row}) => (
        <div>
          <a onClick={() => handleViewDetails(row.original._id)} style={{ cursor: 'pointer' }}>
              {row.original.title}
            </a>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {permissions?.delete &&

            <Button onClick={() => handleDelete(row.original._id)}>
            <DeleteIcon sx={{ color: 'red' }} />
          </Button>
          }
          {permissions?.write&&
            <Link href={`/tasks/update/${row.original._id}`}>
            <Button>
              <EditIcon sx={{ color: 'blue' }} />
            </Button>
          </Link>
          }
        </div>
      ),
    },
  ];

  return (
      <div className="m-6">
      <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">Tasks</h1>
            {permissions?.create && (
          <Link href="/tasks/create">
            <Button className="btn-add text-xs bg-primary text-blue-100">+ Add new TASKS</Button>
          </Link>
        )}
          </div>
          <DataTable columns={columns} data={tasks} />
    </div>
  );
}

export default TaskList;
