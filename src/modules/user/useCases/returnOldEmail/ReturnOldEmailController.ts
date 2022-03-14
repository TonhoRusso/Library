import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ReturnOldEmailUseCase } from './ReturnOldEmailUseCase';

class ReturnOldEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const returnOldEmailUseCase = container.resolve(ReturnOldEmailUseCase);

    await returnOldEmailUseCase.execute(token);

    return response.status(201).json();
  }
}

export { ReturnOldEmailController };
