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

export const BookingServices = {
  getAllBookings,
};
