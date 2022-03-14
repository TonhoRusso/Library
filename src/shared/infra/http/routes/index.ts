import { Router } from 'express';
import { bookShopRouters } from './bookShop/all.routes';
import { userRouters } from './users/all.routes';
import { bookRouters } from './book/all.routes';

const router = Router();

router.use('/user', userRouters);
router.use('/book-shop', bookShopRouters);
router.use('/book', bookRouters);

export { router };
