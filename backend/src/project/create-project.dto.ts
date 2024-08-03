import { IsArray, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  tasks?: Types.ObjectId[];


}