import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse, ISignUpUser } from './auth.interface';

const SignUp = async (
  data: ISignUpUser
): Promise<ILoginUserResponse | undefined> => {
  const { role, email, password } = data;
  let result;
  if (role === ENUM_USER_ROLE.ADMIN) {
    await prisma.admin.create({ data: { email, password } }).then(() => {
      const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );

      const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      result = {
        accessToken,
        refreshToken,
      };
    });
  } else if (role === ENUM_USER_ROLE.SPECIALIST) {
    await prisma.specialist.create({ data: { email, password } }).then(() => {
      const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );

      const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      result = {
        accessToken,
        refreshToken,
      };
    });
  } else if (role === ENUM_USER_ROLE.CUSTOMER) {
    await prisma.customer.create({ data: { email, password } }).then(() => {
      const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );

      const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      result = {
        accessToken,
        refreshToken,
      };
    });
  } else {
    throw new ApiError(401, 'unknown role');
  }

  return result;
};

export const AuthServices = {
  SignUp,
};
