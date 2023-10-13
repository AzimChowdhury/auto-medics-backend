import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/services/services.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
