import { ExternalDocumentationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface IBootstrapModuleOptions {
  configOptions?: {
    yamlFile: string | string[];
  };
  scheduler?: {
    enabled: boolean;
  };
  redis?: {
    enabled: boolean;
  };
}


/**
 * SwaggerConfig
 */
export interface ISwaggerOptions {
  // docPath SwaggerModule.setup
  path: string;
  // setTitle
  titleParam: string;
  // setDescription
  descriptionParam: string;
  // setVersion
  versionParam: string;
  // addTag
  tagParam?: ISwaggerTagParam;
}

export interface ISwaggerTagParam {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

