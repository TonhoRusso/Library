import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidateTokenUseCase } from './ValidateTokenUseCase';

class ValidateTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tokenValidate } = request.params;

    const validateTokenUseCase = container.resolve(ValidateTokenUseCase);

    await validateTokenUseCase.execute(tokenValidate);

    return response.status(201).json();
  }
}

export { ValidateTokenController };
