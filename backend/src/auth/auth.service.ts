// import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { RegisterDto, LoginDto } from './auth.dto';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwtService: JwtService,
//   ) {}
  

//   async register(registerDto: RegisterDto) {
//      // Check if user already exists
//   const existingUser = await this.prisma.user.findUnique({
//     where: { email: registerDto.email },
//   });

//   if (existingUser) {
//     throw new ConflictException('User with this email already exists');
//   }
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const user = await this.prisma.user.create({
//       data: {
//         ...registerDto,
//         password: hashedPassword,
//       },
//     });
//     return { message: 'User registered successfully', userId: user.id };
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.prisma.user.findUnique({
//       where: { email: loginDto.email },
//     });
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { sub: user.id, email: user.email };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      message: 'User registered successfully',
      userId: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
