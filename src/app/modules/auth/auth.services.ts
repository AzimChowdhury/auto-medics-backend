import { Admin, Specialist } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse, ISignInUser, ISignUpUser } from './auth.interface';
import { AuthUtils } from './auth.utils';

const customerSignUp = async (
  data: ISignUpUser
): Promise<ILoginUserResponse | undefined> => {
  const { role, email } = data;
  let { password } = data;
  if (role !== ENUM_USER_ROLE.CUSTOMER) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Invalid role');
  }

  const customers = await prisma.customer.findFirst({
    where: {
      email,
    },
  });
  const specialists = await prisma.specialist.findFirst({
    where: {
      email,
    },
  });
  const admins = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (customers || specialists || admins) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email has already been registered'
    );
  }

  password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  let result;
  if (role === ENUM_USER_ROLE.CUSTOMER) {
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

const SignIn = async (
  data: ISignInUser
): Promise<ILoginUserResponse | undefined | any> => {
  const { email, password } = data;
  const customers = await prisma.customer.findFirst({
    where: {
      email,
    },
  });
  const specialists = await prisma.specialist.findFirst({
    where: {
      email,
    },
  });
  const admins = await prisma.admin.findFirst({
    where: {
      email,
    },
  });
  if (!customers && !specialists && !admins) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  let finalResult;

  if (customers) {
    const result = await AuthUtils.comparePassword(
      password,
      customers.password,
      ENUM_USER_ROLE.CUSTOMER,
      email
    );
    finalResult = result;
  }

  if (specialists) {
    const result = await AuthUtils.comparePassword(
      password,
      specialists.password,
      ENUM_USER_ROLE.SPECIALIST,
      email
    );
    finalResult = result;
  }

  if (admins) {
    const result = await AuthUtils.comparePassword(
      password,
      admins.password,
      ENUM_USER_ROLE.ADMIN,
      email
    );
    finalResult = result;
  }

  return finalResult;
};

const createAdmin = async (data: Admin): Promise<Admin | undefined> => {
  const { name, email, contactNo, address, image } = data;
  let { password } = data;

  const customers = await prisma.customer.findFirst({
    where: {
      email,
    },
  });
  const specialists = await prisma.specialist.findFirst({
    where: {
      email,
    },
  });
  const admins = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (customers || specialists || admins) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email has already been registered'
    );
  }

  password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const result = await prisma.admin.create({
    data: { name, email, password, contactNo, address, image },
  });

  return result;
};

const createSpecialist = async (
  data: Specialist
): Promise<Specialist | undefined> => {
  const { name, email, contactNo, address, image, skill } = data;
  let { password } = data;

  const customers = await prisma.customer.findFirst({
    where: {
      email,
    },
  });
  const specialists = await prisma.specialist.findFirst({
    where: {
      email,
    },
  });
  const admins = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (customers || specialists || admins) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email has already been registered'
    );
  }

  password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const result = await prisma.specialist.create({
    data: { name, email, password, contactNo, address, image, skill },
  });

  return result;
};

export const AuthServices = {
  customerSignUp,
  SignIn,
  createAdmin,
  createSpecialist,
};
