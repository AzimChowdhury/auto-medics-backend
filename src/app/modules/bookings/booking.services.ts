import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllBookings = async () => {
  const result = await prisma.bookings.findMany({
    include: {
      service: true,
      customer: true,
    },
  });
  return result;
};

const deleteBookings = async (id: string) => {
  const result = await prisma.bookings.delete({
    where: {
      id,
    },
  });
  return result;
};

const createBookings = async (data: any) => {
  const { email, serviceId, timeSlot } = data;
  const customer = await prisma.customer.findFirst({
    where: {
      email,
    },
  });
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  const bookingData = { customerId: customer?.id, serviceId, timeSlot };
  const result = await prisma.bookings.create({ data: bookingData });
  return result;
};

export const BookingServices = {
  getAllBookings,
  deleteBookings,
  createBookings,
};
