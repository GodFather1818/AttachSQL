import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from 'src/models/users.models';
import { Roles, RolesSchema } from '../roles/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {}
