import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication
import { AppModule } from './app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Use NestExpressApplication instead of INestApplication
 
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(3001);
}
bootstrap();
