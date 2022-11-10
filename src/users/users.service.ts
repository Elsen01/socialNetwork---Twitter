import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from '../role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `This user ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const userDb = await this.findByEmail(createUserDto.email);
    if (userDb) {
      throw new HttpException(
        `${createUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;
    user.age = createUserDto.age;
    user.role = RoleEnum.USER;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.usersRepository.save(user);
    const { password, ...userResponse } = newUser;
    return userResponse;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async delete(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    if (user.id === userId) {
      await this.usersRepository.remove(user);
      return;
    }
  }

  async update(userId: number, dto: UpdateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        `The user is not available`,
        HttpStatus.NOT_FOUND,
      );
    }

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.username = dto.username;
    user.email = dto.email;
    user.age = dto.age;

    return await this.usersRepository.save(user);
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({
      where: { email: username },
      select: ['id', 'email', 'password'],
    });
  }
  async removeRefreshToken(userId: number) {
    const user = await this.findById(userId);
    user.currentHashedRefreshToken = null;
    await this.usersRepository.save(user);
  }
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }
  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
