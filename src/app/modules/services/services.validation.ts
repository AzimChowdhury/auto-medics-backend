import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    description: z.string().optional(),
    time: z.number().optional(),
    image: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createService,
};
