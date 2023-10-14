import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './services.controller';
import { ServiceValidation } from './services.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.createService),
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.createServices
);

router.get('/', ServiceController.getAllServices);

export const ServiceRoutes = router;
