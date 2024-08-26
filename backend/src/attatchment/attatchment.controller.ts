import { Controller,Logger , Post, Body, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AttachmentService } from './attatchment.service';
import { CreateAttachmentDto } from './attatchment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

// import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentController {
  private readonly logger = new Logger(AttachmentController.name);
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  async createAttachment(
    @Request() req,
    @Body() createAttachmentDto: CreateAttachmentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('User:', req.user);  // Ensure user information is correctly logged
    console.log('Received request to create attachment');
    console.log('User:', req.user);
    console.log('DTO:', createAttachmentDto);
    console.log('Files:', files?.map(f => f.originalname) || 'No files');
    this.logger.log('Received request to create attachment');
    try {
      const result = await this.attachmentService.createAttachment(req.user.userId, createAttachmentDto, files);
      console.log('Attachment created:', result);
      return result;
    } catch (error) {
      console.error('Error creating attachment:', error);
      throw error;
    }  
  }
}

