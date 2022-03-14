import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

class AuthenticationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const authenticationUserUseCase = container.resolve(
      AuthenticationUserUseCase
    );

    const token = await authenticationUserUseCase.execute(data);

    return response.status(200).json(token);
  }
}

export { AuthenticationUserController };
