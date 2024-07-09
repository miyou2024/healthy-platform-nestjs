import { LocalTokenStrategy, NestPassportModule } from '@nestjs-package/passport';
import { Module } from '@nestjs/common';
import { NeedAuthController } from './need-auth.controller';

@Module({
  imports: [
    NestPassportModule.register({
      jwt: {
        enabled: true,
        jwtModuleOptions: {}
      },
      strategyConfig: [
        {
          provider: LocalTokenStrategy,
          options: {
            fieldPosition: 'header',
            fieldName: 'apiToken'
          }
        }
      ]
    }),
  ],
  providers: [],
  controllers: [NeedAuthController]
})
export class NeedAuthModule {}
