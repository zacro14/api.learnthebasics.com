import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreatUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signin(@Body() data: AuthDto) {
    const { accessToken, refreshToken, user } = await this.authService.signin(
      data,
    );

    return { accessToken, refreshToken, user };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: RequestExpress) {
    const userId = req.user['sub'];
    const oldRefreshToken = req.user['refreshToken'];

    const { accessToken } = await this.authService.refreshToken(
      userId,
      oldRefreshToken,
    );

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: RequestExpress) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getPropfile(@Request() req) {
    return req.user;
  }
}
