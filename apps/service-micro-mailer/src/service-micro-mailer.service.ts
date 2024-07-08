import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceMicroMailerService {
  getHello(): string {
    return 'Hello World!';
  }
}
