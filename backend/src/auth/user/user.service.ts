import { BadRequestException, Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserRole  } from 'src/models/users.models';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/auth.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from 'src/dto/login.dto';
import { permission } from 'process';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService){}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async RegisterView(data: RegisterDto){
        const chk_user = await this.userModel.findOne({email: data.email.toLowerCase()})

        if (chk_user) {
            throw new BadRequestException("User Already Exists!");
        }
        const newUser = new this.userModel({
            email: data.email,
            password: data.password, // Ensure password is hashed
            name: data.name,
            role: data.role || UserRole.USER, // Apply default role if not provided
            permissions: data.permissions || {
                read: true,
                write: false,
                create: false,
                delete: false,
            },
        });
        console.log(newUser);
        await newUser.save(); 
        const token = await this.jwtService.sign({userId: newUser._id});

        return {
            token: token,
            email: data.email,
            name: data.name
        };

    }

    async LoginView(data: LoginDto) {
        const chk_user = await this.userModel.findOne({email: data.email.toLowerCase()});

        if (!chk_user) {
            throw new BadRequestException("User Does Not Exists!");
        }

        const isMatch = await bcrypt.compare(data.password, chk_user.password);
        console.log(isMatch);

        if (!isMatch) {
            throw new BadRequestException('Invalid Credentials!');
        }

        const userRole = chk_user.role;
        const token = this.jwtService.sign({userId: chk_user._id, userRole:userRole, permissions: chk_user.permissions});

        return {
            userId:chk_user._id,
            name: chk_user.name,
            userRole: userRole,
            token: token,
            permissions: chk_user.permissions
        }

    }
    
    async profileView(id: string) {
        console.log(id);

        const chk_user = await this.userModel.findById(id).exec();

        if(!chk_user) {
            throw new BadRequestException("User Not Existing!");
        }

        return chk_user;
    }

    async updateUserRole(userId: string, role: UserRole): Promise<User> {
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new NotFoundException("User Not Found!");
        }

        user.role = role;
        await user.save();
        return user;
    }
    async updateUserPermissions(
        id: string,
        permissions: {
          read: boolean;
          write: boolean;
          create: boolean;
          delete: boolean;
        },
      ): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException('User not found');
        }
        console.log('Updating permissions to:', permissions); // Log permissions
        user.permissions = permissions; // Update the permissions field
        await user.save();
        return user;
      }
}
