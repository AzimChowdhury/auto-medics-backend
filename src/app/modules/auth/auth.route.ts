import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.customerSignUp
);

router.post(
  '/signin',
  validateRequest(AuthValidation.SignInZodSchema),
  AuthController.SignIn
);

router.post(
  '/create-admin',
  validateRequest(AuthValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AuthController.createAdmin
);
router.post(
  '/create-specialist',
  validateRequest(AuthValidation.createSpecialistZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AuthController.createSpecialist
);

export const AuthRoutes = router;
