import { container, inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { ICreateBookDTO } from '@modules/book/dtos/ICreateBookDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IBookRepository } from '@modules/book/repositories/IBookRepository';

@injectable()
class ListBooksUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository,

    @inject('BookRepository')
    private bookRepository: IBookRepository
  ) {}

  async execute(bookShopId: string, search: string) {
    if (bookShopId !== 'undefined') {
      const bookShopExist = await this.bookShopRepository.findById(bookShopId);

      if (!bookShopExist) {
        throw new AppError('Bookshop not exist');
      }
    }

    const searchBook = await this.bookRepository.findManyByBookShopId(
      search,
      bookShopId
    );

    return searchBook;
  }
}

export { ListBooksUseCase };
