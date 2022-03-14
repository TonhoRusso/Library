import jwt from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/adapters/models/MailProvider';
import { hash } from 'bcrypt';

@injectable()
class ReturnOldEmailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(token: string): Promise<void> {
    const user = await this.userRepository.findUserByTokenValidation(token);

    if (!user) {
      throw new AppError('User not Exist');
    }

    if (!user.oldEmail) {
      throw new AppError('Email not exist');
    }

    const passwordProvisory = 'hashPassword';
    const hashPasswordProvisory = await hash(passwordProvisory, 8);

    await this.userRepository.updatePasswordById(
      user.id,
      hashPasswordProvisory
    );

    await this.userRepository.returnOldEmail(user.id, user.oldEmail ?? '');

    await this.mailProvider.sendEmail({
      subject: 'Cadastro realizado com sucesso',
      from: {
        name: 'Garusinho de Pantanha',
        email: 'garusinhodepantanha@gmail.com',
      },
      to: {
        name: user.name,
        email: user?.oldEmail || '',
      },
      body: ` <p>Olá ${user.name}</p>
      o email da sua conta foi revertido ao email anterior: ${user.oldEmail}. Por motivos de segurança mudamos as suas credenciais, utilize: ${passwordProvisory} como senha. Apoś efetuar o login poderá alterar as credenciais.`,
    });
  }
}

export { ReturnOldEmailUseCase };
