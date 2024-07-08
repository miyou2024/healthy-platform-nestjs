import { NestFactory } from '@nestjs/core';
import { ServiceMicroMailerModule } from './service-micro-mailer.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceMicroMailerModule);
  await app.listen(3000);
}
bootstrap();
