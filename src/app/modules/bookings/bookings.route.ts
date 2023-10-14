import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';
const router = express.Router();

router.get(
  '/all',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.getAllServices
);

export const BookingRoutes = router;
