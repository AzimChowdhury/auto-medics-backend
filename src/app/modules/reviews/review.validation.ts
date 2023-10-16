import { z } from 'zod';

const reviewSchema = z.object({
  body: z.object({
    customerEmail: z.string({
      required_error: 'customer email is required',
    }),
    rating: z.number({
      required_error: 'rating is required',
    }),
    comment: z.string({
      required_error: 'comment is required',
    }),
  }),
});

export const ReviewValidation = {
  reviewSchema,
};
