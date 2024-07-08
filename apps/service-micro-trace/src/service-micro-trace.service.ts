import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceMicroTraceService {
  getHello(): string {
    return 'Hello World!';
  }
}
