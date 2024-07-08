import { Controller, Get } from '@nestjs/common';
import { ServiceMicroConfigService } from './service-micro-config.service';

@Controller()
export class ServiceMicroConfigController {
  constructor(private readonly serviceMicroConfigService: ServiceMicroConfigService) {}

  @Get()
  getHello(): string {
    return this.serviceMicroConfigService.getHello();
  }
}
