import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test123',
  database: 'postgres',
  entities: ['dist/entities/*{.ts,.js}'],
  synchronize: false,
};
