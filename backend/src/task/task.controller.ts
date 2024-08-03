import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get()
    async findAll(): Promise<Task[]>{
        return this.taskService.findAll();
    }

    @Post()
    async createPost(@Body() task: Task) : Promise<Task> {
        return this.taskService.create(task);
    }
}
