import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/bookings/bookings.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { ServiceRoutes } from '../modules/services/services.route';
import { UserRoutes } from '../modules/users/users.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/services',
    routes: ServiceRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
  {
    path: '/reviews',
    routes: ReviewRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
