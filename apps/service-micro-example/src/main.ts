import { NestFactory } from '@nestjs/core';
import { ServiceMicroExampleModule } from './service-micro-example.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceMicroExampleModule);
  await app.listen(3000);
}
bootstrap();
