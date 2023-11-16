import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { EmiDto } from './dto/emi.dto';
import { User } from 'src/schema/user.schema';


@Injectable()
export class UsersService {

    constructor(private readonly itemsRepository: UserRepository) {}

    async create(createItemDto: CreateUserDto): Promise<User> {
        return this.itemsRepository.create(createItemDto);
      }
    
      async findAll(): Promise<User[]> {
        return this.itemsRepository.findAll();
      }

      async getEmiList(emiDto:EmiDto){

        let tenure = emiDto.tenure * 12;
        let interest_rate = (emiDto.interest/100)/12;
        let amount = emiDto.loan_amount;

        let emi = (amount * interest_rate * Math.pow(1 + interest_rate, tenure))
        / (Math.pow(1 + interest_rate, tenure) - 1);

        emi = Math.round(emi);

        let result = [];
        let principle = amount;
        let total_emi = 0;

        for(let i = 1; i <= tenure; i++){
            let data                = {};
            total_emi               = total_emi + emi;
            data['no']              = i;
            data['emi']             = emi;
            data['interest_paid']   = Math.round(interest_rate*principle);
            data['principle_paid']  = emi - Math.round(interest_rate*principle);
            principle               = principle -  (emi - Math.round(interest_rate*principle));
            data['principle']       = principle;
            data['total_paid_amount'] = total_emi;

            result.push(data);
        }
        return result;
      }
    
      async findOne(id: string): Promise<User> {
        const item = await this.itemsRepository.findOne(id);
        if (!item) {
          throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        return item;
      }

      async login(username: string): Promise<User> {
        const item = await this.itemsRepository.findbyEmail(username);
        if (!item) {
          throw new NotFoundException(`Item with ID ${username} not found.`);
        }
        return item;
      }
    
      async update(id: string, updateItemDto: UpdateUserDto): Promise<User> {
        const item = await this.itemsRepository.update(id, updateItemDto);
        if (!item) {
          throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        return item;
      }
    
      async remove(id: string): Promise<User> {
        const item = await this.itemsRepository.remove(id);
        if (!item) {
          throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        return item;
      }

}
function pow(arg0: any, $loanTenureMonths: any) {
  throw new Error('Function not implemented.');
}

