import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BootstrapService } from './bootstrap.service';
import { IBootstrapModuleOptions } from './bootstrap.interface';
import { initGlobalConfig } from './bootstrap.utils';

@Module({})
export class BootstrapModule{
  static register(options: IBootstrapModuleOptions): DynamicModule {
    const moduleImports: DynamicModule[] = [];
    const moduleProviders: Provider[] = [];
    const moduleExports: DynamicModule[] = [];
    if (options.configOptions?.yamlFile) {
      moduleImports.push(this.installGlobalConfigModule(options.configOptions?.yamlFile));
    }
    if (options.scheduler?.enabled) {
      moduleImports.push(this.installSchedulerModule());
    }
    if (options.redis?.enabled) {
      moduleImports.push(this.installRedisModuleAsync());
    }
    return {
      global     : true,
      module     : BootstrapModule,
      controllers: [],
      providers  : [
        BootstrapService,
        ...moduleProviders,
      ],
      imports    : moduleImports,
      exports    : [
        BootstrapService,
        ...moduleExports,
      ],
    };
  }

  static installGlobalConfigModule(yamlFile: string | string[]) {
    return ConfigModule.forRoot({
      isGlobal: true,
      load    : [initGlobalConfig(yamlFile)],
    });
  }

  static installSchedulerModule() {
    return ScheduleModule.forRoot();
  }

  static installRedisModuleAsync() {
    return RedisModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        const redisOptions = configService.get('Db.Redis.Common');
        console.log('RedisModule.forRootAsync:redisOptions....', redisOptions);
        return {
          readyLog: true,
          config: {
            host: redisOptions.Host,
            port: redisOptions.Port,
            db: redisOptions.DataBase,
            password: redisOptions.PassWord,
          },
        };
      },
    });
  }
}
