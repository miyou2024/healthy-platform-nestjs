import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceMicroExampleService {
  getHello(): string {
    return 'Hello World!';
  }
}
