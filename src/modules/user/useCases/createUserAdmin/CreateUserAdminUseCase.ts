import { hash } from 'bcrypt';
import { container, inject, injectable } from 'tsyringe';

import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserTokenUseCase } from '../createUserToken/CreateUserTokenUseCase';
import { IMailProvider } from '@shared/adapters/models/MailProvider';

@injectable()
class CreateUserAdminUseCase {
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

    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      ...(bodyData as ICreateUserAccountDTO),
      password: hashPassword,
    });

    const createUserTokenUseCase = container.resolve(CreateUserTokenUseCase);

    const tokenValidation = await createUserTokenUseCase.execute(user.id);

    console.log(`tokenValidation ${tokenValidation}`);

    const urlToValidateToken = process.env.URL_TO_VALIDATE_TOKEN ?? '';
    const constUrlWithTokenValidation = `${urlToValidateToken}/${tokenValidation}`;

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
      body: ` <p>Olá ${user.name}</p>
      Clique <a href="${constUrlWithTokenValidation}" target="_blank" rel="noopener noreferrer">aqui</a> para validar a sua conta`,
    });

    const userCreated = await this.userRepository.findById(user.id);

    return userCreated;
  }
}

export { CreateUserAdminUseCase };
