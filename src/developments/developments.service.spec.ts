import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentsService } from './developments.service';

describe('DevelopmentsService', () => {
  let service: DevelopmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevelopmentsService],
    }).compile();

    service = module.get<DevelopmentsService>(DevelopmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
