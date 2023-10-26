import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request } from '@nestjs/common';
import { Public } from '../utils/publicRoutes';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Request() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, +id, updateUserDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.userService.remove(req, +id);
  }
}
