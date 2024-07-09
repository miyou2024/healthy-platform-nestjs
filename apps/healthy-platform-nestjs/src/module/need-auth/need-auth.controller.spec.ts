import { Test, TestingModule } from '@nestjs/testing';
import { NeedAuthController } from './need-auth.controller';

describe('NeedAuthController', () => {
  let controller: NeedAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeedAuthController],
    }).compile();

    controller = module.get<NeedAuthController>(NeedAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
