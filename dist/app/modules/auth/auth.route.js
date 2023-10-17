"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signUpZodSchema), auth_controller_1.AuthController.customerSignUp);
router.post('/signin', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.SignInZodSchema), auth_controller_1.AuthController.SignIn);
router.post('/create-admin', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.createAdminZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.AuthController.createAdmin);
router.post('/create-specialist', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.createSpecialistZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.AuthController.createSpecialist);
exports.AuthRoutes = router;
