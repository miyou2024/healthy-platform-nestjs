import { Module } from '@nestjs/common';
import { ServiceMicroConfigController } from './service-micro-config.controller';
import { ServiceMicroConfigService } from './service-micro-config.service';

@Module({
  imports: [],
  controllers: [ServiceMicroConfigController],
  providers: [ServiceMicroConfigService],
})
export class ServiceMicroConfigModule {}
