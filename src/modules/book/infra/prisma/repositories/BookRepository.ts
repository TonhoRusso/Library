import { ICreateBookDTO } from '@modules/book/dtos/ICreateBookDTO';
import { IUpdateBookDTO } from '@modules/book/dtos/IUpdateBookDTO';
import { IBookRepository } from '@modules/book/repositories/IBookRepository';
import { Book, User } from '@prisma/client';
import { prisma } from '@shared/infra/http/prisma';

class BookRepository implements IBookRepository {
  private connection: typeof prisma.book;

  constructor() {
    this.connection = prisma.book;
  }

  async findByName(name: string): Promise<Book | null> {
    return this.connection.findFirst({ where: { bookName: name } });
  }

  async create({ bookShopId, ...data }: ICreateBookDTO): Promise<Book> {
    return this.connection.create({
      data: { ...data, bookShop: { connect: { id: bookShopId } } },
    });
  }

  async findManyByBookShopId(
    search: string,
    bookShopId: string
  ): Promise<Book[]> {
    return this.connection.findMany({
      where: {
        OR: [
          {
            bookName: { contains: search, mode: 'insensitive' },
          },
          {
            bookShopId,
          },
        ],
      },
    });
  }

  async update(data: IUpdateBookDTO): Promise<void> {
    const { bookId, bookShopId, ...restData } = data;
    await this.connection.update({
      where: { id: bookId },
      data: { ...restData },
    });
  }

  async findById(id: string): Promise<Book | null> {
    return this.connection.findUnique({ where: { id } });
  }
}

export { BookRepository };
