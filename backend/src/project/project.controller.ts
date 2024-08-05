import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
    @Get("/:id")
    async getParticularProject(@Param('id') id: string) : Promise<Project> {
        return this.projectService.findParticularProject(id);
    }

    @Post() 
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }
    @Delete("/:id")
    async deleteProject(@Param('id') id: string): Promise<Project> {
        return this.projectService.deleteProject(id);
    }
    // @Patch()
    @Put("/:id")
    async updateProject(@Param('id') id: string,  @Body() updateData: Partial<Project>): Promise<Project> {
        return this.projectService.updateProject(id, updateData);
    }

}
