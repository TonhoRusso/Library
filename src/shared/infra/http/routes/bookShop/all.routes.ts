import { Router } from 'express';

import { CreateBookShopController } from '@modules/bookshop/useCases/createBookShop/CreateBookShopController';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { UpdateBookShopController } from '@modules/bookshop/useCases/updateBookShop/UpdateBookShopController';
import { ListBookShopController } from '@modules/bookshop/useCases/listAllBookShop/ListBookShopController';

const bookShopRouters = Router();

const createBookShopController = new CreateBookShopController();
const updateBookShopController = new UpdateBookShopController();
const listBookShopController = new ListBookShopController();

bookShopRouters.post(
  '/create',
  ensureAuthenticated,
  createBookShopController.handle
);

bookShopRouters.put(
  '/update/:bookShopId',
  ensureAuthenticated,
  updateBookShopController.handle
);

bookShopRouters.get('/:search/list-bookshops', listBookShopController.handle);

export { bookShopRouters };
