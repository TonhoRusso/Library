import { Permission } from '@prisma/client';

export interface ICreateUserAccountDTO {
  name: string;
  password: string;
  email: string;
  userName: string;
  permission?: Permission;
}
