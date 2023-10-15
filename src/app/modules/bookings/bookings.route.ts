import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';
const router = express.Router();

router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.getAllBookings
);

router.delete(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookingController.deleteBookings
);

export const BookingRoutes = router;
