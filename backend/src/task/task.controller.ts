import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/models/users.models';
import { Roles } from 'src/auth/user/roles.decorator';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get()
    async findAll(): Promise<Task[]>{
        return this.taskService.findAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async findParticularTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.findParticularTask(id);
    }
 
    @Post()
    @UseGuards(AuthGuard)
    async createPost(@Request() req,@Body() task: Task) : Promise<Task> {
        console.log(req);
        const user = req.user;
        console.log(user);
        console.log(task);
        if (!user.permissions.create) {
            throw new ForbiddenException('You do not have permission to create tasks.');
        }
        return this.taskService.create(task);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    async deleteTask(@Param('id') id: string): Promise<Task> {
        return this.taskService.delete(id);
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN)
    async updateTask(@Param('id') id: string, @Body() updateData: Partial<Task>) : Promise<Task> {
        return this.taskService.update(id, updateData);
    }
}
