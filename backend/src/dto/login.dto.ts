import { IsEmail, IsLowercase, IsEnum, IsNotEmpty } from "class-validator";
import { User, UserRole } from "src/models/users.models";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty({message: "Email is Required!"})
    email: string;

    @IsNotEmpty({message: "Password is Reequired!"})
    password: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

