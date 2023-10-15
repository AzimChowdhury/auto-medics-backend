import { z } from 'zod';

const createBookings = z.object({
  body: z.object({
    email: z.string({
      required_error: 'customer email is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    timeSlot: z.string({
      required_error: 'time and date is required',
    }),
  }),
});

export const BookingValidation = {
  createBookings,
};
