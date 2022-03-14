import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserAdminUseCase } from './CreateUserAdminUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUserAdminUseCase = container.resolve(CreateUserAdminUseCase);

    const user = await createUserAdminUseCase.execute(data);

    return response.status(200).json(user);
  }
}

export { CreateUserController };
