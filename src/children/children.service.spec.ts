import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenService } from './children.service';

describe('ChildrenService', () => {
  let service: ChildrenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildrenService],
    })
    .useMocker((token) => {
      if (token === 'ChildRepository') {
        return {
          create: () => {},
          find: () => {},
          findOne: () => {},
          remove: () => {},
          save: () => {},
        };
      }
    })
    .compile();

    service = module.get<ChildrenService>(ChildrenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
