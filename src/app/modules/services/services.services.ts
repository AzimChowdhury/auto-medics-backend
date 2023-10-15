import { Prisma, Services } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IServiceFilter, ServiceSearchableFields } from './service.interface';

const createServices = async (data: Services) => {
  const result = await prisma.services.create({
    data,
  });
  return result;
};

const getAllServices = async (
  filters: IServiceFilter,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ServiceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.ServicesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.services.findMany({
    include: {
      Bookings: true,
      specialist: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.services.count({
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

const deleteService = async (id: string) => {
  const result = await prisma.services.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServicesService = {
  createServices,
  getAllServices,
  deleteService,
};
