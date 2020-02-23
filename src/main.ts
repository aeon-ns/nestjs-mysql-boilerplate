import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'debug', 'log', 'warn'] });
  app.use(function (req, res, next) {
    console.log(`[REQ] ${req.method} ${req.originalUrl}`);
    next();
  });
  await app.listen(3000);
}
bootstrap();
