import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { ICreateLoginDTO } from '@modules/user/dtos/ICreateLoginDTO';
import { createSessionByUserHelper } from '@modules/user/helpers/createLoginSessionHelper';

@injectable()
class AuthenticationUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: ICreateLoginDTO) {
    const createSessionByUser = createSessionByUserHelper;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password is invalid');
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new AppError('Email or password is invalid');
    }

    if (!user.login) {
      throw new AppError('User is not verified');
    }

    const session = createSessionByUser(user);

    return session;
  }
}

export { AuthenticationUserUseCase };
