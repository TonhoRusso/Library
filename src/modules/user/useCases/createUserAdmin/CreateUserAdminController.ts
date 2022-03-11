import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserAdminUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    console.log(data);

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(data);

    return response.status(201).json(user);
  }
}

export { CreateUserController };
