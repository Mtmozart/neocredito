import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/User';
import { Repository } from 'typeorm';
import { comparePassword } from './utils/comparePassword';
import { JwtPayload } from './strategy/jwt.payload';
import { LoginResponseDto } from './dto/LoginResponse.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new BadRequestException('Credenciais inválidas!');
    }

    const passwordMatches = await comparePassword(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Credenciais inválidas!');
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);

    return new LoginResponseDto(token);
  }

  async findUserByEmail(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: jwtPayload.email },
    });
    if (!user) {
      throw new UnauthorizedException('Acesso negado.');
    }
    return user;
  }
}
