import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMicroConfigController } from './service-micro-config.controller';
import { ServiceMicroConfigService } from './service-micro-config.service';

describe('ServiceMicroConfigController', () => {
  let serviceMicroConfigController: ServiceMicroConfigController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMicroConfigController],
      providers: [ServiceMicroConfigService],
    }).compile();

    serviceMicroConfigController = app.get<ServiceMicroConfigController>(ServiceMicroConfigController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceMicroConfigController.getHello()).toBe('Hello World!');
    });
  });
});
