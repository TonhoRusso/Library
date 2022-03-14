import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/prisma/repositories/UserRepository';
import { BookShopRepository } from '@modules/bookshop/infra/prisma/repositories/BookShopRepository';
import { IBookShopRepository } from '@modules/bookshop/repositories/IBookShopRepository';
import { IBookRepository } from '@modules/book/repositories/IBookRepository';
import { BookRepository } from '@modules/book/infra/prisma/repositories/BookRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IBookShopRepository>(
  'BookShopRepository',
  BookShopRepository
);

container.registerSingleton<IBookRepository>('BookRepository', BookRepository);
