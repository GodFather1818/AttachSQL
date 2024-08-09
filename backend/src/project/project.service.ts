import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from "./project.schema";
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

    async findAll(): Promise<Project[]>{
        return this.projectModel.find().populate('ownerId', 'name').exec();    }

    async findParticularProject(id: string): Promise<Project> {
        return this.projectModel.findById(id).populate('ownerId', 'name').exec(); // Populating ownerId with the user's name
    }

    async create(createProjectDto: CreateProjectDto, userId: Types.ObjectId): Promise<Project> {
        const newProject = new this.projectModel({
            ...createProjectDto,
            ownerId: userId
        });
        return newProject.save();
    }

    async deleteProject(projectId: string): Promise<Project> {
        return this.projectModel.findByIdAndDelete(projectId).exec();
    }
    async updateProject(projectId: string, updateData: Partial<Project>): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(projectId, updateData, { new: true }).exec();        
    }

}
