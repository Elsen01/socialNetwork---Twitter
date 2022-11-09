import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
