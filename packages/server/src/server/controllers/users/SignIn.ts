import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { IUsers } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';

import { validation } from '@csnvt/middleware';
import { JWTService, PasswordCrypto } from '@csnvt/services';

interface IBodyProps
  extends Omit<IUsers, 'id' | 'name' | 'perfil' | 'status'> {}

export const signInValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);
  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password invalid...',
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    user.password,
  );
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password invalid',
      },
    });
  } else {
    const accessToken = JWTService.sign({
      uid: user.id,
    });

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Error to generate token',
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        perfil: user.perfil,
      },
    });
  }
};
