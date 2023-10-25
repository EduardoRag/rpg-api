import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserMock } from './__mocks__/createUser.mock';
import { userEntityMock } from './__mocks__/user.mock';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
            find: jest.fn().mockResolvedValue(userEntityMock),
            findOneBy: jest.fn().mockResolvedValue(userEntityMock)
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // it('just a test to see if testing are working', async () => {
  //   expect(service).toBeDefined();
  //   expect(userRepository).toBeDefined();
  // });

  it('should return error if user exist in create', async () => {
    expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return the user that was created in create', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.create(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in create (erro DB)', async () => {
    jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

    expect(
      service.create(createUserMock)
    ).rejects.toThrowError();
  });

  it('should return a user in findOneByName', async () => {
    const user = await service.findOneByName(userEntityMock[0].username);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findOneByName', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findOneByName(userEntityMock[0].username)
    ).rejects.toThrowError();
  });

  it('should return error in findOneByName (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findOneByName(userEntityMock[0].username)
    ).rejects.toThrowError();
  });

  it('should return an array of users in findAll', async () => {
    const users = await service.findAll();

    expect(users).toEqual(userEntityMock);
  });

  it('should return error in findAll (error DB)', async () => {
    jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });
});
