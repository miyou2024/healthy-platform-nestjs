import { Test, TestingModule } from '@nestjs/testing';
import { NestPassportService } from './nest-passport.service';

describe('PassportService', () => {
  let service: NestPassportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestPassportService],
    }).compile();

    service = module.get<NestPassportService>(NestPassportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
