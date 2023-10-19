import { z } from 'zod';

const createNotification = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    details: z.string({
      required_error: 'details is required',
    }),
  }),
});

export const NotificationValidation = {
  createNotification,
};
