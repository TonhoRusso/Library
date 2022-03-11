import { Router } from 'express';

import { CreateUserController } from '@modules/user/useCases/createUserAdmin/CreateUserAdminController';

const userRouters = Router();

const createUserController = new CreateUserController();

userRouters.post('/create-admin', createUserController.handle);

export { userRouters };
