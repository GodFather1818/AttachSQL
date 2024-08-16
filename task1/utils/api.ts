
import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3002",
});


export interface CreateProjectDto {
    name: string;
    tasks?: string[]; // Using string[] to represent ObjectId[] from Mongoose
  }

  // Task.ts

export interface Task {
    title: string;
    description?: string; // Optional field
    stage: string;
    due: Date;
    assigned_to: string[];
    companyName: string;
    contactName: string;
  }

  // Project.ts

export interface Project {
    name: string;
    tasks: string[]; // Using string[] to represent ObjectId[] from Mongoose
    ownerId: string; // Using string to represent ObjectId from Mongoose
  }


export const getProjects = async (headers: any) => {
    const response = await api.get("/project", {headers});
    return response.data;
};
export const getParticularProject = async(id: any) => {
    const response = await api.get(`/project/${id}`);
    return response.data;
}

export const createProject = async (createProjectDto: CreateProjectDto, headers: any) => {
    const response = await api.post("/project", createProjectDto, { headers });
    return response.data;
};

export const deleteProject = async(id: string) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
}

export const updateProject = async(id: string, updateData: Partial<Project>) => {
    const response = await api.put(`/project/${id}`, updateData);
    console.log(response.data);
    return response.data;
}

//  ------------------Tasks API --------------------------------
export const getTasks = async() => {
    const response = await api.get("/tasks");
    return response.data;
};
export const getParticularTask = async(id: string) => {
    const response = await api.get(`/tasks/${id}`);
    console.log(response.data);
    return response.data;
}

export const createTask = async(task: TaskCreateDto, headers: any) => {
    const response = await api.post("/tasks", task, {headers});
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


export interface TaskCreateDto {
    title: string;
    description?: string;
    stage: string;
    due: Date;
    assigned_to: string[];
    companyName: string;
    contactName: string;
}

