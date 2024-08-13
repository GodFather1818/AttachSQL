export class UpdateUserPermissionsDto {
    permissions: {
      read: boolean;
      write: boolean;
      create: boolean;
      delete: boolean;
    };
  }
  