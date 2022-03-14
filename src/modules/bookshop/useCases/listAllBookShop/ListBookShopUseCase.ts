import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

@injectable()
class ListBookShopUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository
  ) {}

  async execute(search: string) {
    return this.bookShopRepository.findBookShopByQuerySearch(search);
  }
}

export { ListBookShopUseCase };
