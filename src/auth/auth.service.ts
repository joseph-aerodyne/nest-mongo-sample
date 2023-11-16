import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create_user.dto';


@Injectable()
export class AuthService {
  constructor(
    private userRepository:UserRepository,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.userRepository.findbyEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user._id, name: user.name, email: user.email, role:user.role};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(user: CreateUserDto) {
    try {
      console.log('enter register');

      console.log('user create details = ' + JSON.stringify(user));
      const regUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        city:user.city,
        age:user.age,
        role:user.role,
      }
      const newUser = await this.userRepository.create(regUser);

      return {
          access_token : await this.jwtService.signAsync({
          id: newUser._id, name: newUser.name, email: newUser.email, role:newUser.role
        }),
        message: 'User information from google registered user',
        user: user,
        payload: {
          id: newUser._id, name: newUser.name, email: newUser.email, role:newUser.role
        },
      }
    } catch(e) {
      console.log('error = ' + JSON.stringify(e));

      return new InternalServerErrorException();
    }
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    console.log(req.user.email);

    const userExists = await this.userRepository.findbyEmail(req.user.email);

    console.log(userExists);

    if (!userExists) {
      return this.registerUser(req.user);
    }

    const payload = { name: req.user.name, email: req.user.email, role:req.user.role};
    
    return {
      message: 'User information from google',
      user: req.user,
      payload: payload,
      access_token: await this.jwtService.signAsync(payload),
    }
  }

}