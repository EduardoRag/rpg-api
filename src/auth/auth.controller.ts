import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { Public } from 'src/utils/publicRoutes';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @HttpCode(200)
    @Post('login')
    login(@Body() user: UserDto) {
        return this.authService.login(user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
