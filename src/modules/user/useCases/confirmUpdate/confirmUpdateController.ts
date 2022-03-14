import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ConfirmUpdateAdminUseCase } from './ConfirmUpdateUseCase';

class ConfirmUpdateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { hash } = request.params;

    const confirmUpdateAdminUseCase = container.resolve(
      ConfirmUpdateAdminUseCase
    );

    const user = await confirmUpdateAdminUseCase.execute(hash);

    return response.status(200).json(user);
  }
}

export { ConfirmUpdateController };
