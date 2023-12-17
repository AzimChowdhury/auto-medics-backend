"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const notification_controller_1 = require("./notification.controller");
const notificaton_validation_1 = require("./notificaton.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(notificaton_validation_1.NotificationValidation.createNotification), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), notification_controller_1.NotificationController.createPublicNotification);
router.get('/', notification_controller_1.NotificationController.getMyNotification);
router.patch('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), notification_controller_1.NotificationController.updateNotification);
exports.NotificationRoutes = router;
