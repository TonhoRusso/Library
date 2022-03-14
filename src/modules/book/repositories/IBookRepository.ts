import { Book } from '@prisma/client';
import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { IUpdateBookDTO } from '../dtos/IUpdateBookDTO';

interface IBookRepository {
  findByName(name: string): Promise<Book | null>;
  create(bookData: ICreateBookDTO): Promise<Book>;
  findManyByBookShopId(search: string, bookShopId: string): Promise<Book[]>;
  update(data: IUpdateBookDTO): Promise<void>;
  findById(id: string): Promise<Book | null>;
}

export { IBookRepository };
