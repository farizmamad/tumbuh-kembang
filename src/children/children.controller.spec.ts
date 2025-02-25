import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';
import { User } from 'src/users/entities/user.entity';

describe('ChildrenController', () => {
  let controller: ChildrenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildrenController],
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

    controller = module.get<ChildrenController>(ChildrenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
