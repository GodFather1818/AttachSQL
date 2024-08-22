import { Module } from '@nestjs/common';
import { AttatchmentService } from './attatchment.service';
import { AttatchmentController } from './attatchment.controller';

@Module({
  providers: [AttatchmentService],
  controllers: [AttatchmentController]
})
export class AttatchmentModule {}
