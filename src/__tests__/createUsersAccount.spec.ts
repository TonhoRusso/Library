import { UserRepositoryInMemory } from '@modules/user/repositories/in-memory/UserRepositoryInMemory';
import { ICreateUserAccountDTO } from '@modules/user/dtos/ICreateUserAccountDTO';
import { AppError } from '@shared/errors/AppError';
import { container } from 'tsyringe';

import { CreateUserAdminUseCase } from '@modules/user/useCases/createUserAdmin/CreateUserAdminUseCase';
import { IMailProvider } from '@shared/adapters/models/MailProvider';

describe('CreateUser', () => {
  const userRepositoryInMemory = new UserRepositoryInMemory();

  const createUserAdminUseCase = container.resolve(CreateUserAdminUseCase);
  // beforeAll(() => {});

  it('should be create and return a user', async () => {
    const data: ICreateUserAccountDTO = {
      email: 'marco.cruz@gmail.com',
      password: '12345678',
      userName: 'Marco Cruz',
      name: 'Marco Cruz',
    };

    const createUserAdmin = await createUserAdminUseCase.execute(data);

    expect(createUserAdmin).toHaveProperty('id');
  });
});
