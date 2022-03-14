import { Book, Status } from '@prisma/client';

export interface ICreateBookDTO extends Omit<Book, 'id'> {
  bookShopId: string;
}
