import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from "./project.schema";

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

    async findAll(): Promise<Project[]>{
        return this.projectModel.find().populate('tasks', 'title').exec();
    }

    async create(project: Project): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
    }


}
