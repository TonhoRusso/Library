import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateBookShopUseCase } from './UpdateBookShopUseCase';

class UpdateBookShopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { bookShopId } = request.params;
    const data = request.body;

    const updateBookShopUseCase = container.resolve(UpdateBookShopUseCase);

    await updateBookShopUseCase.execute(
      {
        ...data,
        bookShopId,
      },
      userId
    );

    return response.status(201).json();
  }
}

export { UpdateBookShopController };
