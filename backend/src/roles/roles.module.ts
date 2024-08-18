import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './roles.schema';
import { RolesGateway } from './roles.gateway';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Roles.name,schema:RolesSchema}])
  ],
  providers: [RolesService, RolesGateway],
  controllers: [RolesController],

})
export class RolesModule {}
