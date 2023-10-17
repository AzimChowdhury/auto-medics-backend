"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.get('/', booking_controller_1.BookingController.getAllBookings);
router.delete('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), booking_controller_1.BookingController.deleteBookings);
router.post('/', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookings), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), booking_controller_1.BookingController.createBookings);
exports.BookingRoutes = router;
