import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(ReviewValidation.reviewSchema),
  ReviewController.postReview
);

router.get(
  '/my-review',
  auth(ENUM_USER_ROLE.CUSTOMER),
  ReviewController.getMyReview
);

router.get('/', ReviewController.getAllReview);

export const ReviewRoutes = router;
