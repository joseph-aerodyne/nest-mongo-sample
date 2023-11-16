// src/items/dto/create-item.dto.ts

import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Role } from './role';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  role: Role;
}
