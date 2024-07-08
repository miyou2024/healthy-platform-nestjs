import { ISwaggerOptions } from './bootstrap.interface';
import { INestApplication, Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dayjs from 'dayjs';

@Injectable()
export class BootstrapService {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  get(key: string | string[]) {
    let keyList = [];
    if (Array.isArray(key)) {
      keyList = key;
    } else {
      keyList.push(key);
    }
    const ConfigData: {
      [key: string]: any;
    } = {};
    keyList.forEach(key => {
      ConfigData[key] = this.configService.get(key, {
        infer: true,
      });
    });
    return ConfigData;
  }

  async startApp(app: INestApplication) {
    const ConfigData = this.get(['Server', 'Swagger']);
    app.setGlobalPrefix(ConfigData.Server.Http.ApiPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    // 开启跨域 tmp-feature
    app.enableCors({});

    // 开启 cookie
    app.use(cookieParser());

    // [${nodeGetInternalIpList().map(ip => `${ip}:${ConfigData.Server.Http.Port}`).join(',')}]
    // [${await nodeGetPublicIp()}:${ConfigData.Server.Http.Port}]
    await this.enableSwagger(app, {
      path            : ConfigData.Swagger.Path,
      titleParam      : ConfigData.Swagger.Title,
      descriptionParam: `
    ${ConfigData.Swagger.Desc}
    [process.env.NODE_ENV=${process.env['NODE_ENV']}]
    [process.env.CloudEnv=${process.env['CloudEnv']}]
    
    [${ConfigData.Server.Http.ApiPrefix}]
    `,
      versionParam    : dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    await app.listen(ConfigData.Server.Http.Port);
    Logger.log(
      `🚀 Application ${ConfigData.Swagger.Title} Server is running on: http://localhost:${ConfigData.Server.Http.Port}/${ConfigData.Server.Http.ApiPrefix}`,
    );
    Logger.log(
      `🚀 Application ${ConfigData.Swagger.Title} Docs is running on: http://localhost:${ConfigData.Server.Http.Port}/docs`,
    );
  }

  async enableSwagger(app: INestApplication, options: ISwaggerOptions) {
    let swaggerBuild = new DocumentBuilder()
      .setTitle(options.titleParam)
      .setDescription(options.descriptionParam)
      .setVersion(options.versionParam);
    if (options.tagParam) {
      swaggerBuild = swaggerBuild.addTag(options.tagParam?.name, options.tagParam?.description, options.tagParam?.externalDocs);
    }
    swaggerBuild = swaggerBuild.addBearerAuth();
    const swaggerConfig = swaggerBuild.build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(options.path, app, document);
    return app;
  }
}
