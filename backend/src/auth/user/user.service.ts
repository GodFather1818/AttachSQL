import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from 'src/models/users.models';
import { Roles } from '../../roles/roles.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Roles.name) private rolesModel: Model<Roles>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('role').exec();
  }

  async findOne(userId: string): Promise<User> {
    return this.userModel.findById(userId).populate('role').exec();
  }

  async RegisterView(data: RegisterDto) {
    const chk_user = await this.userModel.findOne({ email: data.email.toLowerCase() });
  
    if (chk_user) {
      throw new BadRequestException('User Already Exists!');
    }
  
    // Fetch the 'user' role from the database
    const defaultRole = await this.rolesModel.findOne({ name: 'user' });
    if (!defaultRole) {
      throw new BadRequestException('Default role not found!');
    }
  
    const newUser = new this.userModel({
      email: data.email,
      password: data.password,
      name: data.name,
      role: defaultRole._id, 
    });
  
    await newUser.save();
    const token = await this.jwtService.sign({ userId: newUser._id });
  
    return {
      token: token,
      email: data.email,
      name: data.name,
    };
  }
  
  async LoginView(data: LoginDto) {
    const chk_user = await this.userModel.findOne({ email: data.email.toLowerCase() }).populate('role');

    if (!chk_user) {
      throw new BadRequestException('User Does Not Exist!');
    }

    const isMatch = await bcrypt.compare(data.password, chk_user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials!');
    }

    const userRole = chk_user.role;
    const token = this.jwtService.sign({
      userId: chk_user._id,
      userRole: userRole.name,
      permissions: userRole,
    });

    return {
      userId: chk_user._id,
      name: chk_user.name,
      userRole: userRole.name,
      token: token,
      permissions: userRole,
    };
  }

  async profileView(id: string) {
    const chk_user = await this.userModel.findById(id).populate('role').exec();

    if (!chk_user) {
      throw new BadRequestException('User Not Existing!');
    }

    return chk_user;
  }

//   async updateUserRole(userId: string, roleId: string): Promise<User> {
//     const user = await this.userModel.findById(userId).exec();

//     if (!user) {
//       throw new NotFoundException('User Not Found!');
//     }

//     const role = await this.rolesModel.findById(roleId);
//     if (!role) {
//       throw new NotFoundException('Role Not Found!');
//     }

//     user.role = role._id;
//     await user.save();
//     return user;
//   }

async updateUserRole(userId: string, roleId: string): Promise<User> {
  const role = await this.rolesModel.findById(roleId);
  console.log(role)
  if (!role) {
    throw new NotFoundException('Role not found');
  }

  const user = await this.userModel.findByIdAndUpdate(
    userId,
    { role: roleId },
    { new: true },
  );

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;
}
}