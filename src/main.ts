import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { config as setupEnvironment } from 'dotenv';

console.log('[DOTENV] Init ');
setupEnvironment();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'debug', 'log', 'warn'] });
  app.use(cors())
  app.use(morgan('dev'));
  await app.listen(3000);
}
bootstrap();
