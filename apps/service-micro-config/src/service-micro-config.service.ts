import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceMicroConfigService {
  getHello(): string {
    return 'Hello World!';
  }
}
