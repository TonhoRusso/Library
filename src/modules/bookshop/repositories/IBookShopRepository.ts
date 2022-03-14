import { BookShop } from '@prisma/client';
import { ICreateBookShopDTO } from '../dtos/ICreateBookShopDTO';
import { IUpdateBookShopDTO } from '../dtos/IUpdateBookShopDTO';

interface IBookShopRepository {
  findByNameOfBookShop(nameOfInstitution: string): Promise<BookShop | null>;
  create(bookShopData: ICreateBookShopDTO): Promise<BookShop>;
  findById(bookShopId: string): Promise<BookShop | null>;
  update(bookShopData: IUpdateBookShopDTO, userId: string): Promise<void>;
  findBookShopByQuerySearch(search: string): Promise<BookShop[]>;
  findByAdminId(userId: string): Promise<BookShop | null>;
}

export { IBookShopRepository };
