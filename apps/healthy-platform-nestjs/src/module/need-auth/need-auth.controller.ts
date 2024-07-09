import { LocalTokenGuard } from '@nestjs-package/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('NeedAuth')
@UseGuards(LocalTokenGuard)
@Controller('need-auth')
export class NeedAuthController {

  @ApiOperation({
    description: 'need auth',
  })
  @Get('get-test')
  async getTest() {
    return {}
  }
}
