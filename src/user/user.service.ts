import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<void> {
    if (!createUserDto.username) {
      throw new BadRequestException('Username is required.');
    }

    if (!createUserDto.password) {
      throw new BadRequestException('Password is required.');
    }

    const userFound = await this.usersRepository.findOne({ where: { username: createUserDto.username } });

    if (userFound) {
      throw new BadRequestException('This username is already being used');
    }

    const password = await bcrypt.hash(createUserDto.password.toString(), 10);

    createUserDto.password = password;

    await this.usersRepository.save(createUserDto);

    return;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByName(username: string): Promise<User> {
    const userFound = await this.usersRepository.findOne({ where: { username } });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
