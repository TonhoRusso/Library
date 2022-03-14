import jwt from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { User, BookShop, BookShopUsers } from '@prisma/client';

export type CreateSessionByUserResponse = {
  token: string;
  user: {
    userId: string;
    name: string;
    permission: string;
  };
};

export const createSessionByUserHelper = (
  user: User
): CreateSessionByUserResponse => {
  const token = jwt.sign({}, authConfig.jwtToken, {
    subject: user.id,
    expiresIn: authConfig.expires_in_token,
  });

  return {
    token,
    user: {
      userId: user.id,
      name: user.name,
      permission: user.permission,
    },
  };
};
