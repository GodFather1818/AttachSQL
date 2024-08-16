import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getRoleById(id: string): Promise<Roles> {
    const role = await this.rolesModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }

  async updateRole(id: string, updatedRole: Partial<Roles>): Promise<Roles> {
    const role = await this.rolesModel.findByIdAndUpdate(id, updatedRole, { new: true }).exec();
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }
  async deleteRole(id:string):Promise<Roles>{
    return this.rolesModel.findByIdAndDelete(id).exec();
  }
}