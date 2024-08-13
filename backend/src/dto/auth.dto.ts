
import { IsEmail, IsEnum, IsNotEmpty, IsLowercase, IsOptional } from "class-validator";
import { UserRole } from '../models/users.models';

export class RegisterDto {
    @IsNotEmpty({ message: "Username is required" })
    name: string;

    @IsNotEmpty({ message: "Email is required" })
    @IsEmail()
    @IsLowercase()
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @IsOptional() // Role can be optional if you want to use a default
    @IsEnum(UserRole)
    role?: UserRole = UserRole.USER;

    @IsOptional()
    permissions?: {
        read: boolean;
        write: boolean;
        create: boolean;
        delete: boolean;
    } = {
        read: true,
        write: false,
        create: false,
        delete: false,
    };
}
