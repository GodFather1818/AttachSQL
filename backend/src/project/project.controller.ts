import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
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
    async getProjects(@Request() req): Promise<Project[]> {

        const user = req.user;
        if (!user.permissions.projects.READ) {
            throw new ForbiddenException("");
        }
        return this.projectService.findAll();
    }
    
    @Get("/:id")
    @UseGuards(AuthGuard)
    async getParticularProject(@Request() req, @Param('id') id: string) : Promise<Project> {

        const user = req.user;
        if (!user.permissions.projects.READ) {
            throw new ForbiddenException("You dont have permissions ")
        }

        return this.projectService.findParticularProject(id);
    }

    @Post() 
    @UseGuards(AuthGuard)
    async createProject(@Request() req, @Body() createProjectDto: CreateProjectDto ): Promise<Project> {
     
        const user = req.user;
        console.log('Creating project for user:', user.userId);
        if (!user.permissions.projects.CREATE) {
            throw new ForbiddenException("You dont have permissions to create project")
        }
    
        return this.projectService.create(createProjectDto, user.userId);
    }
    @Delete("/:id")
    @UseGuards(AuthGuard)
    async deleteProject(@Request() req, @Param('id') id: string): Promise<Project> {
        const user = req.user;

        
        if (!user.permissions.projects.DELETE) {
            throw new ForbiddenException("You do not have the permission to delete the Project!");
        }
        return this.projectService.deleteProject(id);
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    async updateProject(@Request() req, @Param('id') id: string, @Body() updateData: Partial<Project>): Promise<Project> {
        const user = req.user;

        if (!user.permissions.projects.WRITE) {
            throw new ForbiddenException("You do not have the permission to update the Project!");
        }
        return this.projectService.updateProject(id, updateData);
    }

}
