import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(user: UserDto) {
        if (!user.username) {
            throw new BadRequestException('Username is required.');
        }

        if (!user.password) {
            throw new BadRequestException('Password is required.');
        }

        const userFound = await this.userService.findOneByName(user.username);

        const verifyPass = await bcrypt.compare(user.password, userFound.password);

        if (!verifyPass) {
            throw new UnauthorizedException('Wrong password.');
        }

        const userPayload = {
            id: userFound.id,
            username: userFound.username
        };

        return {
            access_token: await this.jwtService.signAsync(userPayload)
        };
    }
}
