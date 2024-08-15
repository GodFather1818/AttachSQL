import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.schema';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @Get('/api/get/:id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Return a single role' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  getRoleById(@Param('id') id: string): Promise<Roles> {
    return this.rolesService.getRoleById(id);
  }

  @Put('/api/update/:id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({ name: 'id', type: 'string', description: 'Role ID' })
  @ApiBody({ type: Roles })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: Roles })
  @ApiResponse({ status: 404, description: 'Role not found' })
  updateRole(@Param('id') id: string, @Body() updatedRole: Partial<Roles>): Promise<Roles> {
    return this.rolesService.updateRole(id, updatedRole);
  }

}