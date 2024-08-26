import { IsString, IsEnum, IsOptional } from 'class-validator';
import { AttachmentType } from '@prisma/client';

export class CreateAttachmentDto {
  @IsString()
  title: string;

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsString()
  @IsOptional()
  description?: string;
}