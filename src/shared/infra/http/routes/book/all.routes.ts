import { Router } from 'express';

import { CreateBookController } from '@modules/book/useCases/createBook/CreateBookController';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { ListBookController } from '@modules/book/useCases/listBooks/ListBooksController';
import { UpdateBookController } from '@modules/book/useCases/updateBook/UpdateBookController';

const bookRouters = Router();

const createBookController = new CreateBookController();
const listBookController = new ListBookController();
const updateBookController = new UpdateBookController();

bookRouters.post(
  '/book-shop/:bookShopId',
  ensureAuthenticated,
  createBookController.handle
);

bookRouters.get('/search-book', listBookController.handle);

bookRouters.put('/:bookId', ensureAuthenticated, updateBookController.handle);

export { bookRouters };
