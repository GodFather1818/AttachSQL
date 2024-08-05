import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { exec } from 'child_process';

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}
    
    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }
    async findParticularTask(taskId: string): Promise<Task> {
        return this.taskModel.findById(taskId).exec();
    }

    async create(task: Task) : Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save();
    }

    async delete(taskId: string) : Promise<Task> {
        return this.taskModel.findByIdAndDelete(taskId).exec();
    }

    async update(taskId: string, updateData: Partial<Task>): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(taskId, updateData, {new: true}).exec();
    }

}
