import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'dev',
  password: 'dev',
  database: 'backend',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // NOT IN PRODUCTION
};