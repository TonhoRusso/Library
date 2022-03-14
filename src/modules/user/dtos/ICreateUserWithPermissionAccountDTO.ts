import { Permission } from '@prisma/client';

export interface ICreateUserWithPermissionAccountDTO {
  name: string;
  password: string;
  email: string;
  userName: string;
  permission: Permission;
}
