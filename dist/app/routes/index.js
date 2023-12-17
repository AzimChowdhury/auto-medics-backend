"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const bookings_route_1 = require("../modules/bookings/bookings.route");
const notification_route_1 = require("../modules/notifications/notification.route");
const review_route_1 = require("../modules/reviews/review.route");
const services_route_1 = require("../modules/services/services.route");
const users_route_1 = require("../modules/users/users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/services',
        routes: services_route_1.ServiceRoutes,
    },
    {
        path: '/users',
        routes: users_route_1.UserRoutes,
    },
    {
        path: '/bookings',
        routes: bookings_route_1.BookingRoutes,
    },
    {
        path: '/reviews',
        routes: review_route_1.ReviewRoutes,
    },
    {
        path: '/notifications',
        routes: notification_route_1.NotificationRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
