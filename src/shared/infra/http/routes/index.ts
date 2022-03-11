import { Router } from 'express';
import { userRouters } from './users/all.routes';

const router = Router();

router.use('/user', userRouters);

export { router };
