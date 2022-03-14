import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUseCase } from './DeleteUseCase';

class DeleteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUseCase = container.resolve(DeleteUseCase);

    await deleteUseCase.execute(userId);

    return response.status(201).json();
  }
}

export { DeleteController };
