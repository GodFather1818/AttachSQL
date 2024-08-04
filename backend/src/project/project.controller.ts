import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from "./project.schema";
import { CreateProjectDto } from './create-project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}


    @Get()
    async getProjects(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Post() 
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }
    @Delete()
    async deleteProject(@Param('id') id: string): Promise<Project> {
        return this.projectService.deleteProject(id);
    }

}
