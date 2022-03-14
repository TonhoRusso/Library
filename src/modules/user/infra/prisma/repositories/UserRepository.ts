import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { User } from '@prisma/client';
import { ICreateTokenValidationDTO } from '@modules/user/dtos/ICreateTokenValidationDTO';
import { prisma } from '@shared/infra/http/prisma';
import { ICreateUserWithPermissionAccountDTO } from '@modules/user/dtos/ICreateUserWithPermissionAccountDTO';
import { ISaveOldInformation } from '@modules/user/dtos/ISaveOldInforamtions';

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
    return this.connection.findUnique({
      where: { id },
      include: { bookShopUsers: true },
    });
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

  async setLoginValidateById(userId: string): Promise<User> {
    return this.connection.update({
      where: { id: userId },
      data: { login: true },
    });
  }

  async createWithPermission(
    userData: ICreateUserWithPermissionAccountDTO
  ): Promise<User> {
    return this.connection.create({ data: { ...userData } });
  }

  async saveOldInformation(userData: ISaveOldInformation): Promise<void> {
    await this.connection.update({
      where: { id: userData.ownerUserId },
      data: { oldEmail: userData.email },
    });
  }

  async updateEmailById(id: string, email: string): Promise<User> {
    return this.connection.update({ where: { id }, data: { newEmail: email } });
  }

  async updatePasswordById(id: string, password: string): Promise<User> {
    return this.connection.update({
      where: { id },
      data: { newPassword: password },
    });
  }

  async updateNameById(id: string, name: string): Promise<User> {
    return this.connection.update({ where: { id }, data: { newName: name } });
  }

  async findUserByTokenValidation(token: string): Promise<User | null> {
    return this.connection.findFirst({ where: { tokenValidation: token } });
  }

  async returnOldEmail(id: string, oldEmail: string): Promise<void> {
    await this.connection.update({
      where: { id },
      data: {
        email: oldEmail,
        oldEmail: null,
        newEmail: null,
        newName: null,
        newPassword: null,
        confirmationHash: null,
      },
    });
  }

  async updateConfirmationHashById(
    userId: string,
    confirmationHash: string
  ): Promise<void> {
    await this.connection.update({
      where: { id: userId },
      data: {
        confirmationHash,
      },
    });
  }

  async findUserByHash(hash: string): Promise<User | null> {
    return this.connection.findFirst({ where: { confirmationHash: hash } });
  }

  async confirmUpdateEmail(id: string): Promise<void> {
    const user = await this.connection.findUnique({ where: { id } });

    await this.connection.update({
      where: { id },
      data: {
        name: user?.newName || user?.name,
        password: user?.newPassword || user?.password,
        email: user?.newEmail || user?.email,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.connection.update({
      where: { id },
      data: {
        email: 'null',
        login: false,
        newName: 'null',
        newEmail: 'null',
        newPassword: 'null',
        name: 'null',
        oldEmail: 'null',
        oldName: 'null',
        password: 'null',
        tokenValidation: 'null',
        userName: 'null',
      },
    });
  }
}

export { UserRepository };
