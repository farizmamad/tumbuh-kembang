import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentsController } from './developments.controller';
import { DevelopmentsService } from './developments.service';

describe('DevelopmentsController', () => {
  let controller: DevelopmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopmentsController],
      providers: [DevelopmentsService],
    }).compile();

    controller = module.get<DevelopmentsController>(DevelopmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
