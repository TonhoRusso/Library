import { ICreateUserAccountDTO } from '../dtos/ICreateUserAccountDTO';
import { ICreateTokenValidationDTO } from '../dtos/ICreateTokenValidationDTO';
import { User } from '@prisma/client';

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  create(userData: ICreateUserAccountDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  updateToken(tokenData: ICreateTokenValidationDTO): Promise<User | null>;
}

export { IUserRepository };
