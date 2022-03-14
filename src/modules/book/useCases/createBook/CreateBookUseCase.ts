import { container, inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { ICreateBookDTO } from '@modules/book/dtos/ICreateBookDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IBookRepository } from '@modules/book/repositories/IBookRepository';

@injectable()
class CreateBookUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('BookRepository')
    private bookRepository: IBookRepository
  ) {}

  async execute(data: ICreateBookDTO, userId: string) {
    const userExist = await this.userRepository.findById(userId);

    if (!userExist) {
      throw new AppError('User not Exist');
    }

    const bookShopExist = await this.bookShopRepository.findById(
      data.bookShopId
    );

    if (!bookShopExist) {
      throw new AppError('Bookshop not exist');
    }

    if (userExist.permission !== 'ADMIN') {
      throw new AppError('User not have permission');
    }

    const bookExist = await this.bookRepository.findByName(data.bookName);

    if (bookExist) {
      throw new AppError('Book already exist');
    }

    const createBookShop = await this.bookRepository.create(data);

    return createBookShop;
  }
}

export { CreateBookUseCase };
