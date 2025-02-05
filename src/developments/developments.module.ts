import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildrenModule } from 'src/children/children.module';
import { DevelopmentsController } from './developments.controller';
import { DevelopmentsService } from './developments.service';
import { Development } from './entities/development.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Development]),
    ChildrenModule,
  ],
  controllers: [DevelopmentsController],
  providers: [DevelopmentsService],
})
export class DevelopmentsModule {}
