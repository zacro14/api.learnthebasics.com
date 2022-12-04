import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('auth')
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
