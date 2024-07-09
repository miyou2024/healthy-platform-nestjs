import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { PASSPORT_JWT_EXPIRES_IN, PASSPORT_JWT_SECRET } from './nest-passport.constans';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class NestPassportService {

  redis: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async signJwtToken(payload: any) {
    const expireDateTime = dayjs().add(PASSPORT_JWT_EXPIRES_IN, 's').format('YYYY-MM-DD HH:mm:ss');
    const accessToken = this.jwtService.sign(payload);
    return {
      expireDateTime: expireDateTime,
      expireIn      : PASSPORT_JWT_EXPIRES_IN,
      accessToken,
    };
  }

  async validateDingDingCallbackToken(token: string) {
    const dingdingConfig = this.configService.get('dingding');
    if (!dingdingConfig || !dingdingConfig.callbackToken) {
      throw new UnauthorizedException(`配置文件缺少钉钉参数：dingding.callbackToken。`, '-4000010');
    }
    if (dingdingConfig.callbackToken !== token) {
      throw new UnauthorizedException(`配置文件钉钉参数：dingding.callbackToken 和 钉钉传递过来的Token不一致。`, '-4000020');
    }
    return Promise.resolve({
      skip: true,
    });
  }

  async validateConsulWhiteToken(whiteToken: string) {
    const consulConfig = this.configService.get('consul');
    if (!consulConfig || !consulConfig.whiteToken) {
      throw new UnauthorizedException(`配置文件缺少consul参数：consul.whiteToken。`, '-4000010');
    }
    if (consulConfig.whiteToken !== whiteToken) {
      throw new UnauthorizedException(`配置文件钉钉参数：consul.whiteToken 和 consul 服务传递过来的Token不一致。`, '-4000020');
    }
    return Promise.resolve({
      skip: true,
    });
  }

  async validateBearToken(bearToken: string) {
    // this.logger.debug(`validateBearToken：${bearToken}`);
    try {
      const result = await this.redis.hgetall(`web_token_${bearToken}`);
      if (result && result['token'] && result['token'] === bearToken) {
        return Promise.resolve(result);
      }
      throw new UnauthorizedException(`令牌不正确。`, '-4000001');
    } catch (e: any) {
      throw new UnauthorizedException(`令牌不正确。`, '-4000002');
    }
  }

  async validateJwtToken(jwtToken: string) {
    try {
      const result = await this.jwtService.verifyAsync(jwtToken, {
        secret: PASSPORT_JWT_SECRET,
      });
      console.log('validateJwtToken:result', result);
      const iatTime = dayjs(result.iat * 1000).format('YYYY-MM-DD HH:mm:ss');
      const expTime = dayjs(result.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
      console.log('validateJwtToken:result', {
        iatTime,
        expTime,
      });
      return Promise.resolve(true);
    } catch (e: any) {
      console.error('validateJwtToken fail');
      console.error(e, typeof e, e.toString());
      if (typeof e === 'object') {
        if (e.name === 'JsonWebTokenError') {
          throw new UnauthorizedException(`令牌不正确。`, '-4000002');
        }
        if (e.name === 'TokenExpiredError') {
          throw new UnauthorizedException(`令牌过期。`, '-4000003');
        }
      }
      throw new UnauthorizedException(`令牌错误。${e.toString()}`, '-4000001');
    }
  }

  validateApiWhitePath(request: Request, whiteApiPathList: string[]) {
    const len = whiteApiPathList.length;
    for (let i = 0; i < len; i++) {
      const whitePathItem = whiteApiPathList[i];
      if (request && request.originalUrl && request.originalUrl.indexOf(whitePathItem) === 0) {
        return true;
      }
    }
    return false;
  }
}
