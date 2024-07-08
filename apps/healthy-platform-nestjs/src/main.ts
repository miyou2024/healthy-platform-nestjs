import { BootstrapService } from '@nestjs-package/bootstrap';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(BootstrapService).startApp(app);
}
bootstrap();
