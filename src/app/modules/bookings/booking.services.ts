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

export const BookingServices = {
  getAllBookings,
  deleteBookings,
};
