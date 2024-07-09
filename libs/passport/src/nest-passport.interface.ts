import { Provider } from "@nestjs/common";
import { JwtModuleOptions } from '@nestjs/jwt'

export interface IPassportOptions {
  skipAuth?: boolean;
  skipTokenWhitePath?: string[];
  jwt?: IPassportJwtOptions;
  strategy_list?: Provider[];
  strategyConfig?: IPassportStrategyConfig[];
}

export interface IPassportJwtOptions {
  jwtModuleOptions?: JwtModuleOptions;
  enabled: boolean;
}

export interface IPassportStrategyConfig {
  provider: Provider;
  options: IStrategyToken;
}

export type IParamPosition = 'header' | 'body' | 'query' | 'path';

export interface IStrategyToken {
  fieldName: string;
  fieldPosition: IParamPosition | IParamPosition[];
}
