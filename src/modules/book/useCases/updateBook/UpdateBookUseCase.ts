import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IBookRepository } from '@modules/book/repositories/IBookRepository';
import { IUpdateBookDTO } from '@modules/book/dtos/IUpdateBookDTO';

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository,

    @inject('BookRepository')
    private bookRepository: IBookRepository
  ) {}

  async execute(data: IUpdateBookDTO, userId: string) {
    const userAdminExist = await this.bookShopRepository.findByAdminId(userId);

    if (userAdminExist) {
      throw new AppError('User not have permission');
    }

    const bookExist = await this.bookRepository.findById(data.bookId);

    if (!bookExist) {
      throw new AppError('Book not exist');
    }

    const nameOfBookExist = await this.bookRepository.findByName(data.bookName);

    if (nameOfBookExist?.id !== bookExist.id) {
      throw new AppError('Book already exist');
    }

    await this.bookRepository.update({ ...data });
  }
}

export { UpdateBookUseCase };
