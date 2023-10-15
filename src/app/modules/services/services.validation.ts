import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    specialistId: z.string({
      required_error: 'specialist Id is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    time: z.number({
      required_error: 'time is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),
  }),
});

export const ServiceValidation = {
  createService,
};
