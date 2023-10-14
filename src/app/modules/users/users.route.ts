import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './users.controller';
const router = express.Router();

router.get(
  '/customers',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllCustomers
);

router.get('/admins', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllAdmins);

router.get(
  '/specialists',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllSpecialists
);

export const UserRoutes = router;
