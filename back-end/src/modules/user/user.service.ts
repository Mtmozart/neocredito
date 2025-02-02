import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { encrypt } from './utils/encryptPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (userExists) {
        throw new BadRequestException('E-mail já em uso.');
      }
      const user = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: await encrypt(createUserDto.password),
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new InternalServerErrorException('Erro ao processar a requisição.');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new BadRequestException('Usuário não encontrado.');
      }
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new InternalServerErrorException('Erro ao processar a requisição.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      if (updateUserDto.password) {
        updateUserDto.password = await encrypt(updateUserDto.password);
      }

      Object.assign(user, updateUserDto);

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new InternalServerErrorException('Erro ao processar a requisição.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new InternalServerErrorException('Erro ao processar a requisição.');
    }
  }
}
