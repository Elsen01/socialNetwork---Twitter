import { DataSource } from 'typeorm';

export const source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test123',
  database: 'postgres',
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.ts'],
  logging: true,
});
