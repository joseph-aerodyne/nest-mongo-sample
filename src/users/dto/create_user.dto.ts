// src/items/dto/create-item.dto.ts

import { IsString, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';
import { Role } from './role';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:'Test 6'})
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({example:'test6@gmail.com'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example:'test6@123'})
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example:10})
  age: number;

  @IsNotEmpty()
  @ApiProperty({example:'chennai'})
  city: string;
  
  role: Role;
}
