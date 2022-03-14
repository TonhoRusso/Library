import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBookShopUseCase } from './CreateBookShopUseCase';

class CreateBookShopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const data = request.body;

    const createBookShopUseCase = container.resolve(CreateBookShopUseCase);

    const user = await createBookShopUseCase.execute({ ...data, userId });

    return response.status(200).json(user);
  }
}

export { CreateBookShopController };
