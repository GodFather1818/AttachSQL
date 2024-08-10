import { IsEmail, IsEnum, IsNotEmpty, IsLowercase } from "class-validator";
export class RegisterDto {
    @IsNotEmpty({message: "UserNamme is Required"})
    name: string

    @IsNotEmpty({message: "Email is Required!"})
    @IsEmail()
    @IsLowercase()
    email: string

    @IsNotEmpty({message: "Password is Required!"})
    password: string
}


