import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalAccountGuard extends AuthGuard('local-account') {}
