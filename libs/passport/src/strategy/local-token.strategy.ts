import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {
  BadRequestException,
  Injectable
} from "@nestjs/common";

@Injectable()
export class LocalTokenStrategy extends PassportStrategy(Strategy, 'local-token') {

  constructor(
  ) {
    super();
  }

  async validate(token: string) {
    console.log(`LocalTokenStrategy.validate:token`, token);
    if (token !== 'admin') {
      // this.log.verbose('this test auth info');
      throw new BadRequestException(`Token 信息不正确`);
    }
    return {
      token,
      id: 1,
    };
  }
}
