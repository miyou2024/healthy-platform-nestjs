import { NestFactory } from '@nestjs/core';
import { ServiceMicroConfigModule } from './service-micro-config.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceMicroConfigModule);
  await app.listen(3000);
}
bootstrap();
