import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getHello(): string {
    return this.rolesService.get();
  }

  @Post('/api/add')
  @ApiOperation({ summary: 'Add Roles' })
  @ApiResponse({
    status: 200,
    description: 'Add Roles',
    schema: {
      example: {
        id: '123',
        name: 'Role Name',
        description: 'Role Description',
        category: { CREATE: true, READ: true, UPDATE: true, DELETE: true },
        products: { CREATE: true, READ: true, UPDATE: true, DELETE: true },
        projects: { CREATE: true, READ: true, UPDATE: true, DELETE: true },
        tasks: { CREATE: true, READ: true, UPDATE: true, DELETE: true },
      },
    },
  })
  addRoles(@Body() data: Roles): Promise<Roles> {
    return this.rolesService.addRoles(data);
  }

  @Get('/api/get')

  getRoles(): Promise<Roles[]> {
    return this.rolesService.getRole();
}

}