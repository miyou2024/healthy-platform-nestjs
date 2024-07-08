import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMicroExampleController } from './service-micro-example.controller';
import { ServiceMicroExampleService } from './service-micro-example.service';

describe('ServiceMicroExampleController', () => {
  let serviceMicroExampleController: ServiceMicroExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMicroExampleController],
      providers: [ServiceMicroExampleService],
    }).compile();

    serviceMicroExampleController = app.get<ServiceMicroExampleController>(ServiceMicroExampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceMicroExampleController.getHello()).toBe('Hello World!');
    });
  });
});
