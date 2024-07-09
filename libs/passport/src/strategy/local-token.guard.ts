import { AuthGuard } from "@nestjs/passport";
import {
  BadRequestException,
  ExecutionContext,
  Injectable, Inject
} from "@nestjs/common";
import { Observable } from "rxjs";
import { IStrategyToken } from "../nest-passport.interface";
import { LocalTokenStrategy } from "./local-token.strategy";

@Injectable()
export class LocalTokenGuard extends AuthGuard('local-token') {


  constructor(
    @Inject(LocalTokenStrategy.name)
    private readonly strategyOptions: IStrategyToken,
  ) {
    console.log(`LocalTokenGuard.constructor:before`);
    super();
    console.log(`LocalTokenGuard.constructor:after`);
  }

  override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let validateData: any = {};
    switch (this.strategyOptions.fieldPosition) {
      case 'header':
        validateData = request.headers;
        break;
      case 'body':
        validateData = request.body;
        break;
      case 'query':
        validateData = request.query;
        break;
      case 'path':
        validateData = request.params;
        break;
    }
    if (!validateData[this.strategyOptions.fieldName]) {
      throw new BadRequestException(`[${this.strategyOptions.fieldName}] 参数在 [${this.strategyOptions.fieldPosition}] 不存在`);
    }
    return super.canActivate(context);
  }
}
