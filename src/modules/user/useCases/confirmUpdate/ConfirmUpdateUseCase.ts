import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/adapters/models/MailProvider';

@injectable()
class ConfirmUpdateAdminUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(hash: string) {
    const user = await this.userRepository.findUserByHash(hash);

    if (hash !== user?.confirmationHash) {
      throw new AppError('Invalid hash to confirm the update');
    }
    await this.userRepository.confirmUpdateEmail(user.id);

    const urlToReturnOldEmail = process.env.URL_TO_VALIDATE_TOKEN ?? '';
    const constUrlWithTokenValidation = `${urlToReturnOldEmail}/${user?.tokenValidation}`;

    await this.mailProvider.sendEmail({
      subject: 'Alteração de dados cadastrais',
      from: {
        name: 'Garusinho de Pantanha',
        email: 'garusinhodepantanha@gmail.com',
      },
      to: {
        name: user?.name,
        email: user?.email || '',
      },
      body: ` <p> Olá ${user?.name}, houve uma alteração de email em sua conta da library. Caso não tenha sido você, não se preocupe, basta apertar <a href="${constUrlWithTokenValidation}" target="_blank" rel="noopener noreferrer">aqui</a> </p>`,
    });
  }
}

export { ConfirmUpdateAdminUseCase };
