import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { exec } from 'child_process';
import { User } from 'src/models/users.models';
import { TaskGateway } from './task.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { Types } from 'mongoose';
@Injectable()
export class TaskService {

    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel:Model<User>,
        private taskGateway: TaskGateway,
        private notificationService: NotificationService
        ){}
    
    async findAll(): Promise<Task[]> {
        return this.taskModel.find().populate('assigned_to', 'name email').exec();
    }
    async findParticularTask(taskId: string): Promise<Task> {
        return this.taskModel.findById(taskId).exec();
    }
    async findTasksWithUsers():Promise<Task[]> {
        return this.taskModel.find().populate('assigned_to', 'name email').exec();
    }
    
    async create(taskData: Partial<Task>): Promise<Task> {
        if (taskData.assigned_to && taskData.assigned_to.length > 0) {
          const userIds = taskData.assigned_to;
          const existingUsers = await this.userModel.find({ _id: { $in: userIds } }).exec();
          
          if (existingUsers.length !== userIds.length) {
            throw new NotFoundException('One or more assigned users not found');
          }
        }
    
        const newTask = new this.taskModel(taskData);
        await newTask.save();
        const populatedTask = await newTask.populate('assigned_to', 'name email');
        console.log(`the populated tasks' title is: - ${populatedTask .title}`)
        // Emit task assigned notification
        this.taskGateway.emitTaskAssigned(populatedTask);


        // Create notifications for assigned users
    if (populatedTask.assigned_to && populatedTask.assigned_to.length > 0) {
        for (const user of populatedTask.assigned_to) {
          await this.notificationService.createNotification({
            user: user,
            message: `You've been assigned to a new task: ${populatedTask.title}`,
            type: 'task_assigned',
            entityId: populatedTask._id as Types.ObjectId,// Convert to ObjectId
            entityType: 'Task',
          });
        }
      }

        return populatedTask;




    }

    async delete(taskId: string) : Promise<Task> {
        return this.taskModel.findByIdAndDelete(taskId).exec();
    }

    async update(taskId: string, updateData: Partial<Task>): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(taskId, updateData, {new: true}).exec();
    }

}
