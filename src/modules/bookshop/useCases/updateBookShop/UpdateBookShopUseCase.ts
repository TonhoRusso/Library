import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUpdateBookShopDTO } from '@modules/bookshop/dtos/IUpdateBookShopDTO';

@injectable()
class UpdateBookShopUseCase {
  constructor(
    @inject('BookShopRepository')
    private bookShopRepository: IBookShopRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: IUpdateBookShopDTO, userId: string) {
    const userAdminExist = await this.bookShopRepository.findByAdminId(userId);

    if (!userAdminExist) {
      throw new AppError('User not have permission');
    }

    const bookShopExist = await this.bookShopRepository.findById(
      data.bookShopId
    );

    if (!bookShopExist) {
      throw new AppError('Bookshop not exist');
    }

    const bookshopNameExist =
      await this.bookShopRepository.findByNameOfBookShop(data.nameOfBookShop);

    if (!bookshopNameExist) {
      throw new AppError('Bookshop already Exist');
    }
    await this.bookShopRepository.update({ ...data }, userId);
  }
}

export { UpdateBookShopUseCase };
