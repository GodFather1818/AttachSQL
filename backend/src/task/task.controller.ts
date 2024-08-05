import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get()
    async findAll(): Promise<Task[]>{
        return this.taskService.findAll();
    }
    @Get('/:id')
    async findParticularTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.findParticularTask(id);
    }
 
    @Post()
    async createPost(@Body() task: Task) : Promise<Task> {
        return this.taskService.create(task);
    }

    @Delete("/:id")
    async deleteTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.delete(id);
    }

    @Put("/:id")
    async updateTask(@Param('id') id: string, @Body() updateData: Partial<Task>) : Promise<Task> {
        return this.taskService.update(id, updateData);
    }
}
