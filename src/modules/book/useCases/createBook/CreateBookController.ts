import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBookUseCase } from './CreateBookUseCase';

class CreateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { bookShopId } = request.params;
    const data = request.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const user = await createBookUseCase.execute(
      {
        ...data,
        bookShopId,
      },
      userId
    );

    return response.status(200).json(user);
  }
}

export { CreateBookController };
