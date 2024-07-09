import {PassportStrategy} from "@nestjs/passport";
import {
  ExtractJwt,
  Strategy
} from "passport-jwt";
import {
  Injectable,
  Logger
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class TokenJwtStrategy extends PassportStrategy(Strategy, "token-jwt") {

  constructor(
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req: Request) => req.cookies.token || null,
      ignoreExpiration: false,
      secretOrKey: "healthy-passport-jwt-secret"
    });
    console.log({
      message: `JwtStrategy.constructor exec`
    }, 'JwtStrategy.constructor');
  }

  async validate(payload: any) {
    // this.logger.debug(payload, 'TokenJwtStrategy.........validate');
    return {
      id: payload.id,
      userName: payload.userName,
      userMobile: payload.userMobile,
      userEmail: payload.userEmail
    };
  }

}
