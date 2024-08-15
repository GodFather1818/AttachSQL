import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/users.models';
import { Roles,RolesSchema } from '../roles/roles.schema'; // Import Role schema
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        async useFactory() {
          const schema = UserSchema;

          schema.pre('save', async function () {
            if (this.isModified('password')) {
              this.password = await bcrypt.hash(this.password, 10);
            }
          });

          return schema;
        },
      },
      {
        name: Roles.name, // Add Role schema
        useFactory: () => {
          const schema = RolesSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {}