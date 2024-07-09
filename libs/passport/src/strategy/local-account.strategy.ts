import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class LocalAccountStrategy extends PassportStrategy(Strategy, 'local-account') {

  constructor() {
    console.log(`LocalAccountStrategy.constructor`);
    super({
      usernameField: 'account',
      passwordField: 'passwd'
    });
  }

  async validate(account: string, passwd: string) {
    console.log(`LocalAccountStrategy.validate`, {account, passwd});
    if (account !== 'admin' && passwd != '123456') {
      throw new UnauthorizedException();
    }
    return {
      account,
      passwd,
      id: 1,
    };
  }
}
