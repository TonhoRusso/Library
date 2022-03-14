import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListBookShopUseCase } from './ListBookShopUseCase';

class ListBookShopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.params;

    const listBookShopUseCase = container.resolve(ListBookShopUseCase);

    const user = await listBookShopUseCase.execute(search);

    return response.status(200).json(user);
  }
}

export { ListBookShopController };
