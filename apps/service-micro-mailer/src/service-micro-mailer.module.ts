import { Module } from '@nestjs/common';
import { ServiceMicroMailerController } from './service-micro-mailer.controller';
import { ServiceMicroMailerService } from './service-micro-mailer.service';

@Module({
  imports: [],
  controllers: [ServiceMicroMailerController],
  providers: [ServiceMicroMailerService],
})
export class ServiceMicroMailerModule {}
