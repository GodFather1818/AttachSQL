import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from "./project.schema";
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

    async findAll(): Promise<Project[]>{
        return this.projectModel.find().populate('tasks', 'title').exec();
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = new this.projectModel(createProjectDto);
        return newProject.save();
    }

    async deleteProject(projectId: string): Promise<Project> {
        return this.projectModel.findByIdAndDelete(projectId).exec();
    }
    async updateProject(projectId: string, updateData: Partial<Project>): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(projectId, updateData, { new: true }).exec();        
    }

    

}
