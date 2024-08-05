import { BootstrapModule } from '@nestjs-package/bootstrap';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeedAuthModule } from './module/need-auth/need-auth.module';

@Module({
  imports: [
    BootstrapModule.register({
      scheduler: {
        enabled: true,
      },
      redis: {
        enabled: true,
      },
      configOptions: {
        yamlFile: [
          `configs/config.default.yaml`,
          `configs/config.${process.env['CLOUD_ENV']}.yaml`,
        ]
      }
    }),
    NeedAuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
