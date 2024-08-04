import axios from "axios";
import { Task } from "../../backend/src/task/task.schema";
import { Project } from "../../backend/src/project/project.schema";
import {CreateProjectDto} from "../../backend/src/project/create-project.dto"
const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const getProjects = async() => {
    const response = await api.get("/project");
    return response.data;
};

export const createProject = async(createProjectDto: CreateProjectDto) => {
    const response = await api.post("/project", createProjectDto);
    return response.data;
};

export const deleteProject = async(id: string) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
}

export const updateProject = async(id: string, updateData: Partial<Task>) => {
    const response = await api.put(`/project/${id}`, updateData);
    return response.data;
}


export const getTasks = async() => {
    const response = await api.get("/task");
    return response.data;
};

export const createTask = async(task: Task) => {
    const response = await api.post("/task", task);
    return response.data;
};

export const deleteTask = async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

export const updateTask = async (id: string, updateData: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, updateData);
    return response.data;
};




