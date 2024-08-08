import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import {  JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWT_KEY } from 'src/constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Getting the Headers
    const request: Request = context.switchToHttp().getRequest();
    const authtoken = request.headers['authorization'] || '';

    if (!authtoken || !authtoken.startsWith('Bearer')) {
      throw new UnauthorizedException("Please Login First!!");
    }

    const token = authtoken.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token Not Valid!");
    }

    try {
      const payLoad = this.jwtService.verifyAsync(token, {
        secret: JWT_KEY
      })

      request['user'] = payLoad;
    }catch(error) {
      throw new UnauthorizedException("Token Not Valid!!");
    }



    return true;
  }
}
