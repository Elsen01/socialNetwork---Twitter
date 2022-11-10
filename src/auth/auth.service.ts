import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '../role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';
import { EmailConfirmService } from '../email-confirm/email-confirm.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly emailConfirmService: EmailConfirmService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async register(createUserDto: CreateUserDto) {
    const userD = await this.findByEmail(createUserDto.email);
    if (userD) {
      throw new HttpException(
        `${createUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const users = new UserEntity();
    users.email = createUserDto.email;
    users.firstName = createUserDto.firstName;
    users.lastName = createUserDto.lastName;
    users.username = createUserDto.username;
    users.age = createUserDto.age;
    users.role = RoleEnum.USER;
    users.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersRepository.save(users);
    const { password, ...userResponse } = newUser;
    await this.emailConfirmService.sendVerificationLink(users.email);
    return userResponse;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
  public getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const expiresIn = '10m';
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn,
    });
    return `Authentication=${token}; HttpOnly; Path=/; max-Age=/${expiresIn}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const expiresIn = '10d';
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn,
    });
    const cookie = `Refresh =${token}; HttpOnly; Path=/; max-Age=/${expiresIn}`;
    return {
      cookie,
      token,
    };
  }
  getCookieForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; max-Age=0',
      'Refresh =; HttpOnly; Path=/; max-Age=0',
    ];
  }
}
