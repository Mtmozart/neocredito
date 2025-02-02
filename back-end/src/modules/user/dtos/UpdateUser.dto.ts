import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'O nome do parceiro deve ter pelo menos 2 caracteres',
  })
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @IsNotEmpty({ message: 'É obrigatório informar o e-mail' })
  email?: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @IsOptional()
  password?: string;
}
