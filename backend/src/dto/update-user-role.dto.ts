import { IsEnum } from 'class-validator';
import { UserRole } from "../models/users.models";

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
