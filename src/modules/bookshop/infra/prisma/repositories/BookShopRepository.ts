import { ICreateBookShopDTO } from '@modules/bookshop/dtos/ICreateBookShopDTO';
import { IUpdateBookShopDTO } from '@modules/bookshop/dtos/IUpdateBookShopDTO';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { BookShop, User } from '@prisma/client';
import { prisma } from '@shared/infra/http/prisma';

class BookShopRepository implements IBookShopRepository {
  private connection: typeof prisma.bookShop;

  constructor() {
    this.connection = prisma.bookShop;
  }

  async findByNameOfBookShop(nameOfBookShop: string): Promise<BookShop | null> {
    return this.connection.findUnique({ where: { nameOfBookShop } });
  }

  async create(bookShopData: ICreateBookShopDTO): Promise<BookShop> {
    const { userId, ...restData } = bookShopData;
    const { admin = userId } = bookShopData;
    const bookShop = await this.connection.create({
      data: {
        ...restData,
        admin,
        bookShopUsers: {
          connectOrCreate: {
            where: {
              id: userId,
            },
            create: {
              userId,
            },
          },
        },
      },
    });

    return bookShop;
  }

  async findById(bookShopId: string): Promise<BookShop | null> {
    return this.connection.findUnique({ where: { id: bookShopId } });
  }

  async update(
    bookShopData: IUpdateBookShopDTO,
    userId: string
  ): Promise<void> {
    const { bookShopId, ...restBookData } = bookShopData;
    await this.connection.update({
      where: { id: bookShopId },
      data: {
        ...restBookData,
      },
    });
  }

  async findBookShopByQuerySearch(search: string): Promise<BookShop[]> {
    let searchData: any = {
      where: {
        OR: [{ nameOfBookShop: { contains: { search, mode: 'insensitive' } } }],
      },
    };
    return searchData;
  }

  async findByAdminId(userId: string): Promise<BookShop | null> {
    return this.connection.findFirst({ where: { admin: userId } });
  }
}

export { BookShopRepository };
