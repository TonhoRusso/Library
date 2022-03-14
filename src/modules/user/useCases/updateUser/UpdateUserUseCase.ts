import jwt from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/adapters/models/MailProvider';
import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO';
import { hash } from 'bcrypt';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IUpdateUserDTO): Promise<void> {
    const userExist = await this.userRepository.findById(data.userId);

    if (!userExist) {
      throw new AppError('User not exist');
    }

    if (data.password) {
      const hashPassword = await hash(data.password, 8);

      await this.userRepository.updatePasswordById(userExist.id, hashPassword);
    }

    if (data.name) {
      const userNameAlreadyExist = await this.userRepository.findByUserName(
        data.name
      );
      if (userNameAlreadyExist) {
        throw new AppError('UserName already exist');
      }

      await this.userRepository.updateNameById(userExist.id, data.name);
    }

    if (data.email) {
      if (data.email === userExist.email) {
        throw new AppError('Email already exist');
      }

      console.log(userExist);
      await this.userRepository.saveOldInformation({
        email: userExist.email,
        ownerUserId: userExist.id,
      });

      const urlToReturnOldEmail = process.env.URL_TO_VALIDATE_TOKEN ?? '';
      const constUrlWithTokenValidation = `${urlToReturnOldEmail}/${userExist.tokenValidation}`;

      await this.mailProvider.sendEmail({
        subject: 'Alteração de dados cadastrais',
        from: {
          name: 'Garusinho de Pantanha',
          email: 'garusinhodepantanha@gmail.com',
        },
        to: {
          name: userExist.name,
          email: userExist.email,
        },
        body: ` <p> Olá ${userExist.name}, houve uma alteração de email em sua conta da library. Caso não tenha sido você, não se preocupe, basta apertar <a href="${constUrlWithTokenValidation}" target="_blank" rel="noopener noreferrer">aqui</a> </p>`,
      });

      const emailAlreadyExist = await this.userRepository.findByEmail(
        data.email
      );
      if (emailAlreadyExist) {
        throw new AppError('Email already exist');
      }

      await this.userRepository.updateEmailById(userExist.id, data.email);
      const createHashToConfirm = await hash('hashToConfirm', 8);

      await this.userRepository.updateConfirmationHashById(
        data.userId,
        createHashToConfirm
      );

      const newUser = await this.userRepository.findById(data.userId);
      const urlWithHashToConfirmUpdate = `${urlToReturnOldEmail}/confirm/${createHashToConfirm}`;

      await this.mailProvider.sendEmail({
        subject: 'Alteração de dados cadastrais',
        from: {
          name: 'Garusinho de Pantanha',
          email: 'garusinhodepantanha@gmail.com',
        },
        to: {
          name: data?.name ?? userExist.name,
          email: data?.email,
        },
        body: ` <p> Olá ${userExist.name}, houve uma alteração de email em sua conta da library. Basta apertar <a href="${urlWithHashToConfirmUpdate}" target="_blank" rel="noopener noreferrer">aqui</a> para confirmar a atualização de email </p>`,
      });
    }
  }
}

export { UpdateUserUseCase };
