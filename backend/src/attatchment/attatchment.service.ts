import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAttachmentDto } from './attatchment.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class AttachmentService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createAttachment(userId: number, createAttachmentDto: CreateAttachmentDto, files: Express.Multer.File[]) {
    const attachment = await this.prisma.attachment.create({
      data: {
        ...createAttachmentDto,
        userId,
      },
    });

    const filePromises = files.map(file => this.fileService.processFile(file, attachment.id));


    await Promise.all(filePromises);

    return attachment;
  }
}