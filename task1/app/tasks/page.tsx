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

import {useRouter} from 'next/navigation';


function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleViewDetails = async(id: any) => {
    router.push(`/tasks/view/${id}`);
  }

  return (
    <div>
      {tasks.length !== 0 ? (
        <div className="mt-10 container mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center h-16 m-4">
            <h1 className="text-3xl font-bold text-primary">Tasks</h1>
            <Link href={`/tasks/create`}>
              <Button className="btn-add p-3 bg-primary text-blue-100 hover:text-black">
                + Add new Tasks
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="m-3 relative card bg-slate-100 shadow-md rounded-lg p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <button
                  className="absolute top-0 right-0 mt-2 mr-2 bg-primary"
                  onClick={() => handleDelete(task._id)}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </button>
                <Link href={`/tasks/update/${task._id}`}>
                  <Button className="absolute top-0 right-100 mt-2 mr-2 bg-primary ">
                    <EditIcon sx={{ color: "white", '&:hover': { color: "black" } }} />
                  </Button>
                </Link>
                <div className="flex justify-around items-center w-100 mt-[5vh] h-[10vh]">
                  <h2 className="font-semibold text-blue-500 text-2xl ">
                    {task.title}
                  </h2>
                  <button className="shadow bg-blue-500 hover:bg-blue-200 p-3 rounded-md font-bold hover:underline" onClick={()=> handleViewDetails(task._id)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>No Tasks added in the database!</h1>
      )}
    </div>
    // </div>
  );
}

export default TaskList;
