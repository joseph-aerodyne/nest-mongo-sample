import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../dto/role';
import { User } from 'src/schema/user.schema';



@Injectable()
export class UserRepository {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async create(createItemDto: CreateUserDto): Promise<User> {

    const saltOrRounds = 10;
    const password = createItemDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createItemDto.password = hash;
    createItemDto.role = Role.User;

    const createdItem = new this.userModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  
  async findbyEmail(username: string): Promise<User> {
    return await this.userModel.findOne({email: username});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
