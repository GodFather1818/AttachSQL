import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from "./project.schema";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}


    @Get()
    async getProjects(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Post() 
    async createProject(@Body() project: Project): Promise<Project> {
        return this.projectService.create(project);
    }

}
