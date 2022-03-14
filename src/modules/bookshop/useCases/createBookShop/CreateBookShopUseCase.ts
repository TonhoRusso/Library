import { container, inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { ICreateBookShopDTO } from '@modules/bookshop/dtos/ICreateBookShopDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

@injectable()
class CreateBookShopUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateBookShopDTO) {
    const userExist = await this.userRepository.findById(data.userId);

    if (!userExist) {
      throw new AppError('User not Exist');
    }

    if (userExist.permission !== 'ADMIN') {
      throw new AppError('User not have permission');
    }

    const bookShopExist = await this.bookShopRepository.findByNameOfBookShop(
      data.nameOfBookShop
    );

    if (
      String(bookShopExist?.nameOfBookShop).toLowerCase() ===
      String(data.nameOfBookShop).toLowerCase()
    ) {
      throw new AppError('Bookshop already exist');
    }

    const createBookShop = await this.bookShopRepository.create({ ...data });

    return createBookShop;
  }
}

export { CreateBookShopUseCase };
