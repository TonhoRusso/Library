import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { User } from '@prisma/client';
import { ICreateTokenValidationDTO } from '@modules/user/dtos/ICreateTokenValidationDTO';
import { prisma } from '@shared/infra/http/prisma';

class UserRepository implements IUserRepository {
  private connection: typeof prisma.user;

  constructor() {
    this.connection = prisma.user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.connection.findUnique({
      where: { email },
    });
    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = await this.connection.findUnique({
      where: { userName },
    });
    return user;
  }

  async create(userData: ICreateUserAccountDTO): Promise<User> {
    const { permission = 'ADMIN' } = userData;

    return this.connection.create({
      data: {
        ...userData,
        permission,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.connection.findUnique({ where: { id } });
  }

  async updateToken(
    tokenData: ICreateTokenValidationDTO
  ): Promise<User | null> {
    const { id, tokenValidation } = tokenData;
    return this.connection.update({
      where: { id },
      data: { tokenValidation },
    });
  }
}

export { UserRepository };
