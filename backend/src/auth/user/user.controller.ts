import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/users.models';
import { RegisterDto } from 'src/dto/auth.dto';
import { LoginDto } from 'src/dto/login.dto';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '../auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUser() : Promise<User[]>{
        return this.userService.findAll();
    }

    @Post('register')
    async postData(@Body() data: RegisterDto) {
        return this.userService.RegisterView(data);
    }

    @Post("login")
    async postLogin(@Body() data: LoginDto) {
        return this.userService.LoginView(data);
    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('profile')
    async profileView(@Request() req) {
        const user = await req?.user;
        if (!user || user.userId) {
            throw new BadRequestException("User Not Found!");
        }
        console.log(user);
        return this.userService.profileView(user?.userId);
    }
}
