import { Services } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createServices = async (data: Services) => {
  const result = await prisma.services.create({
    data,
  });
  return result;
};

export const ServicesService = {
  createServices,
};
