import { NestFactory } from '@nestjs/core';
import { ServiceMicroTraceModule } from './service-micro-trace.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceMicroTraceModule);
  await app.listen(3000);
}
bootstrap();
