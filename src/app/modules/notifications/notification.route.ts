import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { NotificationController } from './notification.controller';
import { NotificationValidation } from './notificaton.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(NotificationValidation.createNotification),
  auth(ENUM_USER_ROLE.ADMIN),
  NotificationController.createPublicNotification
);

router.get('/', NotificationController.getMyNotification);

router.patch(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  NotificationController.updateNotification
);

export const NotificationRoutes = router;
