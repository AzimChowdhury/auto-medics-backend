import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
const router = express.Router();

router.get('/', BookingController.getAllBookings);

router.delete(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookingController.deleteBookings
);

router.post(
  '/',
  validateRequest(BookingValidation.createBookings),
  auth(ENUM_USER_ROLE.CUSTOMER),
  BookingController.createBookings
);

export const BookingRoutes = router;
