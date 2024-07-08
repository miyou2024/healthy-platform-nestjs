import { Controller, Get } from '@nestjs/common';
import { ServiceMicroExampleService } from './service-micro-example.service';

@Controller()
export class ServiceMicroExampleController {
  constructor(private readonly serviceMicroExampleService: ServiceMicroExampleService) {}

  @Get()
  getHello(): string {
    return this.serviceMicroExampleService.getHello();
  }
}
