import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { ISOStringToDate, ISOStringToTime } from '../../../helpers/Date';
import {
  sendMailToAdmins,
  sendMailToCustomer,
  sendMailToSpecialist,
} from '../../../helpers/sendMail';
import prisma from '../../../shared/prisma';

const getAllBookings = async (data: any) => {
  const { role, email } = data;
  if (role === ENUM_USER_ROLE.ADMIN) {
    const result = await prisma.bookings.findMany({
      include: {
        service: true,
        customer: true,
      },
    });

    return result;
  } else if (role === ENUM_USER_ROLE.CUSTOMER) {
    const customer = await prisma.customer.findFirst({ where: { email } });
    const result = await prisma.bookings.findMany({
      where: { customerId: customer?.id },
      include: { service: true, customer: true },
    });
    return result;
  } else if (role === ENUM_USER_ROLE.SPECIALIST) {
    const specialist = await prisma.specialist.findFirst({
      where: { email },
      include: { Services: true },
    });
    if (specialist) {
      const serviceIds = specialist.Services.map(service => service.id);

      const bookings = await prisma.bookings.findMany({
        where: {
          serviceId: {
            in: serviceIds,
          },
        },
        include: {
          service: true,
          customer: true,
        },
      });

      return bookings;
    }
  }
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

  if (result?.id) {
    const service = await prisma.services.findFirst({
      where: { id: result?.serviceId },
      include: { specialist: true },
    });
    const admins = await prisma.admin.findMany();
    const date = ISOStringToDate(timeSlot);
    const time = ISOStringToTime(timeSlot);
    await sendMailToCustomer({ service, customer, date, time });
    await sendMailToSpecialist({
      service,
      specialist: service?.specialist,
      customer,
      date,
      time,
    });

    await sendMailToAdmins({
      service,
      specialist: service?.specialist,
      customer,
      admins,
      date,
      time,
    });
  }
  return result;
};

export const BookingServices = {
  getAllBookings,
  deleteBookings,
  createBookings,
};
