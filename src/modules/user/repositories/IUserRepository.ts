import { ICreateUserAccountDTO } from '../dtos/ICreateUserAccountDTO';
import { ICreateTokenValidationDTO } from '../dtos/ICreateTokenValidationDTO';
import { User } from '@prisma/client';
import { ICreateUserWithPermissionAccountDTO } from '../dtos/ICreateUserWithPermissionAccountDTO';
import { ISaveOldInformation } from '../dtos/ISaveOldInforamtions';

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  create(userData: ICreateUserAccountDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  updateToken(tokenData: ICreateTokenValidationDTO): Promise<User | null>;
  setLoginValidateById(userId: string): Promise<User>;
  createWithPermission(
    userData: ICreateUserWithPermissionAccountDTO
  ): Promise<User>;
  saveOldInformation(userData: ISaveOldInformation): Promise<void>;
  updateEmailById(id: string, email: string): Promise<User>;
  updatePasswordById(id: string, password: string): Promise<User>;
  updateNameById(id: string, name: string): Promise<User>;
  findUserByTokenValidation(token: string): Promise<User | null>;
  returnOldEmail(id: string, oldEmail: string): Promise<void>;
  updateConfirmationHashById(
    userId: string,
    confirmationHash: string
  ): Promise<void>;
  findUserByHash(hash: string): Promise<User | null>;
  confirmUpdateEmail(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
