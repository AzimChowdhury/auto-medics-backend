"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_services_1 = require("./auth.services");
const customerSignUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.customerSignUp(req.body);
    if (result === null || result === void 0 ? void 0 : result.accessToken) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'creation successful',
            data: result,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_IMPLEMENTED,
            success: false,
            message: 'creation failed',
            data: result,
        });
    }
}));
const SignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.SignIn(req.body);
    if (result === null || result === void 0 ? void 0 : result.accessToken) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Log in successful',
            data: result,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_IMPLEMENTED,
            success: false,
            message: 'Log in  failed',
            data: result,
        });
    }
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.createAdmin(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'admin created successfully',
        data: result,
    });
}));
const createSpecialist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.createSpecialist(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Specialist create successfully',
        data: result,
    });
}));
exports.AuthController = {
    customerSignUp,
    SignIn,
    createAdmin,
    createSpecialist,
};
