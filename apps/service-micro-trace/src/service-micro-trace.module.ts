import { Module } from '@nestjs/common';
import { ServiceMicroTraceController } from './service-micro-trace.controller';
import { ServiceMicroTraceService } from './service-micro-trace.service';

@Module({
  imports: [],
  controllers: [ServiceMicroTraceController],
  providers: [ServiceMicroTraceService],
})
export class ServiceMicroTraceModule {}
