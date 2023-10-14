import { Prisma } from '@prisma/client';
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

export const UserServices = {
  getAllCustomers,
  getAllAdmins,
  getAllSpecialists,
};
