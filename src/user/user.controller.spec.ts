import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        const results = [
          {
            id: 1,
            username: 'rag',
            password: '$2b$10$L13KRXDpXGqROx8QtqElcejmVBpbeJw/Ah1nU.WkctvCdURVnWkSu',
            characters: []
          }
        ];

        if (token === UserService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      }).compile();

    userController = module.get(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await userController.findAll()).toBe(UserDto);
    });
  });
});
