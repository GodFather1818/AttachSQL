import { CanActivate, ExecutionContext,ForbiddenException ,Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWT_KEY } from 'src/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authtoken = request.headers['authorization'] || '';

    if (!authtoken || !authtoken.startsWith('Bearer')) {
      throw new UnauthorizedException("Please Login First!!");
    }

    const token = authtoken.split(" ")[1];
    console.log(token)
    if (!token) {
      throw new UnauthorizedException("Token Not Valid!");
    }

    try {
      const payLoad = await this.jwtService.verifyAsync(token, {
        secret: JWT_KEY,
      });

      request['user'] = payLoad;

      // Checking the User Permissions based on the method. 

      // const userPermissions = payLoad.permissions;

      // if(request.method === 'GET' && !userPermissions.read) {
      //   throw new ForbiddenException('You do not have permission to view this resource.');
      // }

      // if(request.method === 'POST' && !userPermissions.create) {
      //   throw new ForbiddenException("You don't have permission to create this resource.");
      // }
      // if (request.method === 'PUT' && !userPermissions.write) {
      //   throw new ForbiddenException("You do not have permission to update this resource.");
      // }
      // if (request.method === 'DELETE' && !userPermissions.delete) {
      //   throw new ForbiddenException("You do not have permission to delete this resource");
      // }

    } catch (error) {
      throw new UnauthorizedException("Token Not Valid!!");
    }

    return true;
  }
}
