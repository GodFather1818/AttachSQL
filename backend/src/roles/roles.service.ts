import { Injectable, NotFoundException } from '@nestjs/common';
import { Roles } from './roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesGateway } from './roles.gateway';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private rolesModel: Model<Roles>, private readonly rolesGateway: RolesGateway,) {}

  get() {
    return 'Hello World!';
  }

  async addRoles(roles: Roles): Promise<Roles> {
    const newRole = new this.rolesModel(roles);
    await newRole.save();
    // Emit WebSocket event
    this.rolesGateway.emitRoleAdded(newRole);
    return newRole;  
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
    console.log(`Emitting roleUpdated event for role: ${role.name}`); 

    this.rolesGateway.emitUpdatedRole(role);
    return role;
  }

  async deleteRole(id:string):Promise<Roles>{
   
    const role = await this.rolesModel.findByIdAndDelete(id).exec();
    if (!role) {
      throw new NotFoundException(`Role ${role.name} not Found`);
    }

    this.rolesGateway.emitRoleDeleted(role);
    return role;
  }
}
