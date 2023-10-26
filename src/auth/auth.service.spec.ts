import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../user/__mocks__/user.mock';
import { UserService } from '../user/user.service';
import { jwtMock } from './__mocks__/jwt.mock';
import { loginUserMock } from './__mocks__/login-user.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByName: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(jwtMock)
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should return valid token in Login', async () => {
    const token = await service.login(loginUserMock);

    expect(token).toEqual({
      access_token: jwtMock
    });
  });

  it('should return wrong password', async () => {
    expect(service.login({ ...loginUserMock, password: '12345' })
    ).rejects.toThrowError();
  });

  it('should return user not found', async () => {
    jest.spyOn(userService, 'findOneByName').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'findOneByName').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
