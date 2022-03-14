import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateBookUseCase } from './UpdateBookUseCase';

class UpdateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { bookId, bookShopId } = request.params;
    const data = request.body;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);

    const book = await updateBookUseCase.execute(
      { ...data, bookId, bookShopId },
      userId
    );

    return response.status(200).json(book);
  }
}

export { UpdateBookController };
