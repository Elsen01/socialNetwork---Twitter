import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import JwtRefreshGuard from './jwt-refresh.guard';
import { EmailConfirmService } from '../email-confirm/email-confirm.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private readonly emailConfirmService: EmailConfirmService,
  ) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req,
    };
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('/login')
  async login(@Req() req) {
    const { user } = req;

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(
      user.id,
    );
    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id,
    );
    req.res.setHeaders('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    await this.emailConfirmService.sendVerificationLink(createUserDto.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request, @Res() response: Response) {
    await this.userService.removeRefreshToken(request.user.id);
    response.setHeader('SetCookie', this.authService.getCookieForLogout());
    return response.sendStatus(200);
  }
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: Request) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user['id'],
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
