"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const services_controller_1 = require("./services.controller");
const services_validation_1 = require("./services.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(services_validation_1.ServiceValidation.createService), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.createServices);
router.get('/', services_controller_1.ServiceController.getAllServices);
router.delete('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.deleteServices);
exports.ServiceRoutes = router;
