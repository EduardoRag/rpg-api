import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @HttpCode(200)
    @Post('login')
    login(@Body() user: UserDto) {
        return this.authService.login(user);
    }
}
