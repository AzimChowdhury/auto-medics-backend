"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.get('/customers', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getAllCustomers);
router.get('/admins', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getAllAdmins);
router.get('/specialists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getAllSpecialists);
router.get('/profile', users_controller_1.UserController.getMyProfileInfo);
router.patch('/update-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.SPECIALIST), users_controller_1.UserController.updateMyProfile);
router.delete('/admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteAdmin);
router.delete('/customer', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteCustomer);
router.delete('/specialist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteSpecialist);
exports.UserRoutes = router;