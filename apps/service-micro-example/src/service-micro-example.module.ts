import { Module } from '@nestjs/common';
import { ServiceMicroExampleController } from './service-micro-example.controller';
import { ServiceMicroExampleService } from './service-micro-example.service';

@Module({
  imports: [],
  controllers: [ServiceMicroExampleController],
  providers: [ServiceMicroExampleService],
})
export class ServiceMicroExampleModule {}
