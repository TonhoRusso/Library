import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { authConfig } from '@config/auth';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { User } from '@prisma/client';

@injectable()
class CreateUserTokenUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, expiresIn = '4h'): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist in the database');
    }

    console.log(authConfig.jwtToken);
    console.log(`create validation to user ${user.id}`);

    const tokenValidation = jwt.sign({ id: user.id }, authConfig.jwtToken, {
      expiresIn,
    });

    console.log(
      `token to validate the account email created success${tokenValidation}`
    );

    const userToken = await this.userRepository.updateToken({
      id,
      tokenValidation,
    });

    return userToken;
  }
}

export { CreateUserTokenUseCase };
