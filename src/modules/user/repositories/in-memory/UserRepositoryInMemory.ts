import { User } from '@prisma/client';

import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { IUserRepository } from '../IUserRepository';
import { ICreateTokenValidationDTO } from '@modules/user/dtos/ICreateTokenValidationDTO';
import { v4 as uuidV4 } from 'uuid';

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const userExist = this.users.find((user) => user.email === email);
    return userExist || null;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = this.users.find((user) => user.userName === userName);
    return user || null;
  }

  async create(userData: ICreateUserAccountDTO): Promise<User> {
    const { permission = 'ADMIN', email, userName, password, name } = userData;

    const user = {
      id: uuidV4(),
      email,
      userName,
      password,
      name,
      permission,
      oldEmail: null,
      tokenValidation: null,
      login: false,
    };
    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async updateToken(
    tokenData: ICreateTokenValidationDTO
  ): Promise<User | null> {
    const { id, tokenValidation } = tokenData;
    const userIndex = this.users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
      return null;
    }

    const user = { ...this.users[userIndex], tokenValidation };

    this.users[userIndex] = user;

    return user || null;
  }
}

export { UserRepositoryInMemory };
