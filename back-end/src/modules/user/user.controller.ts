import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { ResponseUserDto } from './dtos/ResponseUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.userService.create(createUserDto));
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return new ResponseUserDto(await this.userService.findOne(id));
  }

  @Patch(':id')
  @HttpCode(200)
  async edit(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return new ResponseUserDto(
      await this.userService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
