import { Module, DynamicModule, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PASSPORT_JWT_SECRET, PASSPORT_JWT_EXPIRES_IN, PASSPORT_OPTION_PROVIDE } from './nest-passport.constans';
import { IPassportOptions } from './nest-passport.interface';
import { NestPassportService } from './nest-passport.service';

@Module({})
export class NestPassportModule {
  static register(options: IPassportOptions) {
    const moduleImports: DynamicModule[] = [];
    if (options.jwt?.enabled) {
      moduleImports.push(this.initJwtModuleAsync(options));
    }
    const strategyProviders: Provider[] = [];
    if (options.strategyConfig) {
      options.strategyConfig.forEach(item => {
        console.log(`options.strategyConfig:item`, (item.provider as any).name);
        strategyProviders.push(item.provider);
        strategyProviders.push({
          useValue: item.options,
          provide : (item.provider as any).name,
        });
      });
    }
    return {
      global     : true,
      module     : NestPassportModule,
      imports    : [
        ...moduleImports,
      ],
      controllers: [],
      providers  : [
        {
          provide : PASSPORT_OPTION_PROVIDE,
          useValue: options,
        },
        ...strategyProviders,
        NestPassportService,
      ],
      exports    : [
        {
          provide : PASSPORT_OPTION_PROVIDE,
          useValue: options,
        },
        ...strategyProviders,
        NestPassportService,
      ],
    };
  }

  static initJwtModule(options: IPassportOptions) {
    return JwtModule.register({
      global     : true,
      secret     : PASSPORT_JWT_SECRET,
      signOptions: {
        expiresIn: `${PASSPORT_JWT_EXPIRES_IN}`,
      },
      ...options.jwt?.jwtModuleOptions,
    });
  }

  static initJwtModuleAsync(options: IPassportOptions) {
    return JwtModule.registerAsync({
      useFactory: () => {
        return {
          global     : true,
          secret     : PASSPORT_JWT_SECRET,
          signOptions: {
            expiresIn: `${PASSPORT_JWT_EXPIRES_IN}`,
          },
          ...options.jwt?.jwtModuleOptions,
        };
      },
    });
  }
}
