import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AttatchmentModule } from './attatchment/attatchment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AttatchmentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

