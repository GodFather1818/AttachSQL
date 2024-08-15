
import { IsEmail, IsEnum, IsNotEmpty, IsLowercase, IsOptional, IsMongoId } from "class-validator";
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

    @IsOptional()
    @IsMongoId() 
    roleId?:string

   
}
