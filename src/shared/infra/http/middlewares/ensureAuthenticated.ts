import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid token!', 401);
  }

  const { 1: token = '' } = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwtToken) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
