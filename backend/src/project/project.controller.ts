import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from "./project.schema";
import { CreateProjectDto } from './create-project.dto';
import { Roles } from 'src/auth/user/roles.decorator';
import { UserRole } from 'src/models/users.models';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}


    @Get()
    @UseGuards(AuthGuard)
    async getProjects(@Request() req): Promise<Project[] | Project> {
        const user = req.user;

        if(user.role === UserRole.ADMIN) {
            // ADMIN: Show all the projects
            return this.projectService.findAll();
        }else if (user.role === UserRole.USER) {
            // Regular User: Show only thier Project.
            return this.projectService.findParticularProject(user.userId);
        }else {
            throw new UnauthorizedException("Not Authorized to view projects");
        }

    }
    
    @Get("/:id")
    async getParticularProject(@Param('id') id: string) : Promise<Project> {
        return this.projectService.findParticularProject(id);
    }

    @Post() 
    @UseGuards(AuthGuard)
    async createProject(@Body() createProjectDto: CreateProjectDto, @Request() req): Promise<Project> {
        const userId = req.user.userId;

        return this.projectService.create(createProjectDto, userId);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    async deleteProject(@Param('id') id: string, @Request() req): Promise<Project> {
        const user = req.user;

        if (user.role === UserRole.ADMIN) {
            return this.projectService.deleteProject(id);
        } else {
            const project = await this.projectService.findParticularProject(id);
            if (project.ownerId.toString() === user.userId) {
                return this.projectService.deleteProject(id);
            } else {
                throw new UnauthorizedException("Not Authorized to delete this project");
            }
        }
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    async updateProject(@Param('id') id: string, @Body() updateData: Partial<Project>, @Request() req): Promise<Project> {
        const user = req.user;

        if (user.role === UserRole.ADMIN) {
            return this.projectService.updateProject(id, updateData);
        } else {
            const project = await this.projectService.findParticularProject(id);
            if (project.ownerId.toString() === user.userId) {
                return this.projectService.updateProject(id, updateData);
            } else {
                throw new UnauthorizedException("Not Authorized to update this project");
            }
        }
    }

}
