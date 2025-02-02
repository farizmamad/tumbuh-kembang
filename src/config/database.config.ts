import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (dirname: string) => registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME ?? 'tumbuh-kembang',
    password: process.env.DB_PASSWORD ?? 'tumbuh-kembang',
    database: process.env.DB_DATABASE ?? 'tumbuh-kembang',
    autoLoadEntities: true,
    synchronize: true,
    // entities: [dirname + '/../**/*.entity.{js,ts}']
  }),
)();

module.exports = { databaseConfig };