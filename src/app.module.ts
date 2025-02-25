import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { DevelopmentsModule } from './developments/developments.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // do not use TypeOrmModule.forRootAsync because of the problem in Typeorm.utils dependency: crypto
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    ChildrenModule,
    DevelopmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
