import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentModule } from './attatchment/attatchment.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [AttachmentModule, AuthModule, FileModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
  }), MulterModule.register({
    dest: './uploads',
  }),],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

