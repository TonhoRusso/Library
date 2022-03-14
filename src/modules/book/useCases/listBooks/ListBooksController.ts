import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListBooksUseCase } from './ListBooksUseCase';

class ListBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, bookShopId } = request.query;

    const listBooksUseCase = container.resolve(ListBooksUseCase);

    const book = await listBooksUseCase.execute(
      String(bookShopId),
      String(search)
    );

    return response.status(200).json(book);
  }
}

export { ListBookController };
