import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from "./project.schema";
import { Task, TaskSchema } from 'src/task/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])
  ],

  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
