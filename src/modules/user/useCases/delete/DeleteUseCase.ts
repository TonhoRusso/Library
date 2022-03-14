import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const userExist = await this.userRepository.findById(userId);

    if (!userExist) {
      throw new AppError('User not exist');
    }

    await this.userRepository.delete(userId);
  }
}

export { DeleteUseCase };
