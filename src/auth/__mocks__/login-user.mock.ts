import { userEntityMock } from '../../user/__mocks__/user.mock';
import { UserDto } from '../../user/dto/user.dto';

export const loginUserMock: UserDto = {
    username: userEntityMock.username,
    password: '123'
};