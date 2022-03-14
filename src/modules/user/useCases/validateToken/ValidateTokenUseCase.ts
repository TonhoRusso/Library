import jwt from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/adapters/models/MailProvider';
import { authConfig } from '@config/auth';

@injectable()
class ValidateTokenUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(tokenValidate: string): Promise<void> {
    try {
      const { id } = jwt.verify(tokenValidate, authConfig.jwtToken) as {
        id: string;
      };

      const userExist = await this.userRepository.findById(id);

      if (!userExist) {
        throw new AppError('User not exist');
      }

      if (userExist.login) {
        throw new AppError('User already verified');
      }

      await this.userRepository.setLoginValidateById(userExist.id);

      await this.mailProvider.sendEmail({
        subject: 'Email confirmado com sucesso',
        from: {
          name: 'Garusinho de Pantanha',
          email: 'garusinhodepantanha@gmail.com',
        },
        to: {
          name: userExist.name,
          email: userExist.email,
        },
        body: `
      <p>Olá ${userExist.name}</p>     
         Seja Bem vindo! Sua conta foi ativada com sucesso.
        `,
      });
    } catch (err: any) {
      let { message } = err;

      if (err.message.toLowerCase() === 'jwt expired') {
        message = 'Invalid token';
      }

      throw new AppError(message);
    }
  }
}

export { ValidateTokenUseCase };
