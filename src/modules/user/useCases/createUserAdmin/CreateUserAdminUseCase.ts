import { hash } from 'bcrypt';
import { container, inject, injectable } from 'tsyringe';

import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserTokenUseCase } from '../createUserToken/CreateUserTokenUseCase';
import { IMailProvider } from '@shared/adapters/models/MailProvider';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserAccountDTO) {
    const { password, ...bodyData } = data;

    const emailAlreadyExist = await this.userRepository.findByEmail(data.email);

    const userNameAlreadyExist = await this.userRepository.findByUserName(
      data.userName
    );

    if (emailAlreadyExist) {
      throw new AppError('Email already exist');
    }

    if (userNameAlreadyExist) {
      throw new AppError('UserName already exist');
    }
    userNameAlreadyExist;

    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      ...(bodyData as ICreateUserAccountDTO),
      password: hashPassword,
    });

    const createUserTokenUseCase = container.resolve(CreateUserTokenUseCase);

    const validationToken = await createUserTokenUseCase.execute(user.id);

    console.log(`tokenValidation ${validationToken}`);

    await this.mailProvider.sendEmail({
      subject: 'Cadastro realizado com sucesso',
      from: {
        name: 'Garusinho de Pantanha',
        email: 'garusinhodepantanha@gmail.com',
      },
      to: {
        name: user.name,
        email: user.email,
      },
      body: ` <p> Seja bem vindo ${user.name}</p>`,
    });

    return validationToken;
  }
}

export { CreateUserUseCase };
