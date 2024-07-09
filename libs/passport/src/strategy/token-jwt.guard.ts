import { isRabbitContext } from '@golevelup/nestjs-rabbitmq'
import { AuthGuard } from "@nestjs/passport";
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { NestPassportService } from "../nest-passport.service";
import { IPassportOptions } from "../nest-passport.interface";
import { PASSPORT_OPTION_PROVIDE } from "../nest-passport.constans";
import { Request } from "express";

@Injectable()
export class TokenJwtGuard extends AuthGuard('token-jwt') {

  constructor(
    private readonly passportService: NestPassportService,
    @Inject(PASSPORT_OPTION_PROVIDE)
    private readonly passportOptions: IPassportOptions,
  ) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isRabbitContext(context)) {
      return Promise.resolve(true);
    }
    // this.logger.debug(this.passportOptions, `TokenJwtGuard.........canActivate`);
    const request = context.switchToHttp().getRequest<Request>();
    if (Array.isArray(this.passportOptions.skipTokenWhitePath) && this.passportService.validateApiWhitePath(request, this.passportOptions.skipTokenWhitePath)) {
      return Promise.resolve(true);
    }
    // @ts-ignore
    if (request.user && request.user.skip && request.user.skip === true) {
      // this.logger.debug('request.user.skip is true');
      return Promise.resolve(true);
    }
    let token = null;
    if (request.headers.authorization) {
      // this.logger.debug('request.headers.authorization is true');
      token = request.headers.authorization;
    } else {
      if (request.cookies && request.cookies['token']) {
        // this.logger.debug('request.cookies.authorization is true');
        token = request.cookies['token'];
      }
    }
    if (token) {
      // this.logger.debug(`Token：${token}`);
      const result = await this.passportService.validateBearToken(token.replace('Bearer ', ''));
      request.user = result;
      return Promise.resolve(true);
    } else {
      // this.logger.debug(`Token：没有！`);
      throw new UnauthorizedException();
    }
  }

}
