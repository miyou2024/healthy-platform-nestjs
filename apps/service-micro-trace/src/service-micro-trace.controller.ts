import { Controller, Get } from '@nestjs/common';
import { ServiceMicroTraceService } from './service-micro-trace.service';

@Controller()
export class ServiceMicroTraceController {
  constructor(private readonly serviceMicroTraceService: ServiceMicroTraceService) {}

  @Get()
  getHello(): string {
    return this.serviceMicroTraceService.getHello();
  }
}
