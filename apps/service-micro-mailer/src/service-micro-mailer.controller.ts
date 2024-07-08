import { Controller, Get } from '@nestjs/common';
import { ServiceMicroMailerService } from './service-micro-mailer.service';

@Controller()
export class ServiceMicroMailerController {
  constructor(private readonly serviceMicroMailerService: ServiceMicroMailerService) {}

  @Get()
  getHello(): string {
    return this.serviceMicroMailerService.getHello();
  }
}
