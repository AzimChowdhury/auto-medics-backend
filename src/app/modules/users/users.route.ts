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

router.get('/profile', UserController.getMyProfileInfo);

router.patch(
  '/update-profile',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.SPECIALIST
  ),
  UserController.updateMyProfile
);

router.delete('/admin', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteAdmin);

export const UserRoutes = router;
