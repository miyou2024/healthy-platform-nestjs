import { BootstrapModule } from '@nestjs-package/bootstrap';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BootstrapModule.register({
      scheduler: {
        enabled: true,
      },
      configOptions: {
        yamlFile: [
          'configs/config.local.yaml',
          'configs/config.default.yaml'
        ]
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
