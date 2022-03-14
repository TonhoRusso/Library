import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserWithPermissionUseCase } from './CreateUserWithPermissionUseCase';

class CreateUserWithPermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    console.log(data);

    const createUserWithPermissionUseCase = container.resolve(
      CreateUserWithPermissionUseCase
    );

    const user = await createUserWithPermissionUseCase.execute(data);

    return response.status(200).json(user);
  }
}

export { CreateUserWithPermissionController };
