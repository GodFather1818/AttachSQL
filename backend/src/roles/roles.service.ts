import { Injectable } from '@nestjs/common';
import { Roles } from './roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private rolesModel: Model<Roles>) {}

  get() {
    return 'Hello World!';
  }

  async addRoles(roles: Roles): Promise<Roles> {
    return new this.rolesModel(roles).save();
  }

  async getRole():Promise<Roles[]>{
    return this.rolesModel.find().exec();
  }
}