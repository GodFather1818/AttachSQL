import { Module } from '@nestjs/common';
import { AttachmentController } from './attatchment.controller';
import { AttachmentService } from './attatchment.service';
// import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [FileModule, AuthModule],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}