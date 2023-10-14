import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ICustomerFilter, customerSearchableFields } from './user.interface';

const getAllCustomers = async (
  filters: ICustomerFilter,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: customerSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.CustomerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.customer.findMany({
    include: {
      Bookings: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.customer.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllAdmins = async (
  filters: ICustomerFilter,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: customerSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllSpecialists = async (
  filters: ICustomerFilter,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: customerSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.SpecialistWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.specialist.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.specialist.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getMyProfileInfo = async (email: string, role: string) => {
  if (!email) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid email');
  }
  if (
    !role ||
    (role !== ENUM_USER_ROLE.ADMIN &&
      role !== ENUM_USER_ROLE.CUSTOMER &&
      role !== ENUM_USER_ROLE.SPECIALIST)
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'invalid role');
  }
  if (role === ENUM_USER_ROLE.ADMIN) {
    const result = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    return result;
  }
  if (role === ENUM_USER_ROLE.CUSTOMER) {
    const result = await prisma.customer.findUnique({
      where: {
        email,
      },
    });
    return result;
  }
  if (role === ENUM_USER_ROLE.SPECIALIST) {
    const result = await prisma.specialist.findUnique({
      where: {
        email,
      },
    });
    return result;
  } else {
    return 'profile data not found';
  }
};

export const UserServices = {
  getAllCustomers,
  getAllAdmins,
  getAllSpecialists,
  getMyProfileInfo,
};
