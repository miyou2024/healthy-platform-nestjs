import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMicroMailerController } from './service-micro-mailer.controller';
import { ServiceMicroMailerService } from './service-micro-mailer.service';

describe('ServiceMicroMailerController', () => {
  let serviceMicroMailerController: ServiceMicroMailerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMicroMailerController],
      providers: [ServiceMicroMailerService],
    }).compile();

    serviceMicroMailerController = app.get<ServiceMicroMailerController>(ServiceMicroMailerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceMicroMailerController.getHello()).toBe('Hello World!');
    });
  });
});
