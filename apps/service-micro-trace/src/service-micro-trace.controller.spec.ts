import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMicroTraceController } from './service-micro-trace.controller';
import { ServiceMicroTraceService } from './service-micro-trace.service';

describe('ServiceMicroTraceController', () => {
  let serviceMicroTraceController: ServiceMicroTraceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMicroTraceController],
      providers: [ServiceMicroTraceService],
    }).compile();

    serviceMicroTraceController = app.get<ServiceMicroTraceController>(ServiceMicroTraceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceMicroTraceController.getHello()).toBe('Hello World!');
    });
  });
});
