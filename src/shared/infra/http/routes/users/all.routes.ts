import { Router } from 'express';

import { CreateUserController } from '@modules/user/useCases/createUserAdmin/CreateUserAdminController';
import { ValidateTokenController } from '@modules/user/useCases/validateToken/ValidateTokenController';
import { AuthenticationUserController } from '@modules/user/useCases/authenticationUser/AuthenticationUserController';
import { CreateUserWithPermissionController } from '@modules/user/useCases/createUserWithPermission/CreateUserWithPermissionController';
import { UpdateUserController } from '@modules/user/useCases/updateUser/UpdateUserController';
import { ReturnOldEmailController } from '@modules/user/useCases/returnOldEmail/ReturnOldEmailController';
import { ConfirmUpdateController } from '@modules/user/useCases/confirmUpdate/confirmUpdateController';
import { DeleteController } from '@modules/user/useCases/delete/DeleteController';

const userRouters = Router();

const createUserController = new CreateUserController();
const validateTokenController = new ValidateTokenController();
const authenticationUserController = new AuthenticationUserController();
const createUserWithPermissionController =
  new CreateUserWithPermissionController();
const updateUserAdminController = new UpdateUserController();
const returnOldEmailController = new ReturnOldEmailController();
const confirmUpdateController = new ConfirmUpdateController();
const deleteController = new DeleteController();

userRouters.post('/create-admin', createUserController.handle);

userRouters.post(
  '/token_validation/:tokenValidate',
  validateTokenController.handle
);

userRouters.post('/auth', authenticationUserController.handle);

userRouters.post(
  '/create-with-permission',
  createUserWithPermissionController.handle
);

userRouters.put('/:userId/update-user', updateUserAdminController.handle);

userRouters.put('/:token/return-old-email', returnOldEmailController.handle);

userRouters.post('/:hash/confirm-update', confirmUpdateController.handle);

userRouters.delete('/:userId/delete', deleteController.handle);

export { userRouters };
