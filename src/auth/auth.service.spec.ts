import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

it('create auth service testing', async () => {
  const module = await Test.createTestingModule({
    providers: [AuthService],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
