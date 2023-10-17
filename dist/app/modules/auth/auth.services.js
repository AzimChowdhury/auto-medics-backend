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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const auth_utils_1 = require("./auth.utils");
const customerSignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, email } = data;
    let { password } = data;
    if (role !== user_1.ENUM_USER_ROLE.CUSTOMER) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Invalid role');
    }
    const customers = yield prisma_1.default.customer.findFirst({
        where: {
            email,
        },
    });
    const specialists = yield prisma_1.default.specialist.findFirst({
        where: {
            email,
        },
    });
    const admins = yield prisma_1.default.admin.findFirst({
        where: {
            email,
        },
    });
    if (customers || specialists || admins) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email has already been registered');
    }
    password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    let result;
    if (role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        yield prisma_1.default.customer.create({ data: { email, password } }).then(() => {
            const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
            const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
            result = {
                accessToken,
                refreshToken,
            };
        });
    }
    else {
        throw new ApiError_1.default(401, 'unknown role');
    }
    return result;
});
const SignIn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const customers = yield prisma_1.default.customer.findFirst({
        where: {
            email,
        },
    });
    const specialists = yield prisma_1.default.specialist.findFirst({
        where: {
            email,
        },
    });
    const admins = yield prisma_1.default.admin.findFirst({
        where: {
            email,
        },
    });
    if (!customers && !specialists && !admins) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    let finalResult;
    if (customers) {
        const result = yield auth_utils_1.AuthUtils.comparePassword(password, customers.password, user_1.ENUM_USER_ROLE.CUSTOMER, email);
        finalResult = result;
    }
    if (specialists) {
        const result = yield auth_utils_1.AuthUtils.comparePassword(password, specialists.password, user_1.ENUM_USER_ROLE.SPECIALIST, email);
        finalResult = result;
    }
    if (admins) {
        const result = yield auth_utils_1.AuthUtils.comparePassword(password, admins.password, user_1.ENUM_USER_ROLE.ADMIN, email);
        finalResult = result;
    }
    return finalResult;
});
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, address, image } = data;
    let { password } = data;
    const customers = yield prisma_1.default.customer.findFirst({
        where: {
            email,
        },
    });
    const specialists = yield prisma_1.default.specialist.findFirst({
        where: {
            email,
        },
    });
    const admins = yield prisma_1.default.admin.findFirst({
        where: {
            email,
        },
    });
    if (customers || specialists || admins) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email has already been registered');
    }
    password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.admin.create({
        data: { name, email, password, contactNo, address, image },
    });
    return result;
});
const createSpecialist = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, address, image, skill } = data;
    let { password } = data;
    const customers = yield prisma_1.default.customer.findFirst({
        where: {
            email,
        },
    });
    const specialists = yield prisma_1.default.specialist.findFirst({
        where: {
            email,
        },
    });
    const admins = yield prisma_1.default.admin.findFirst({
        where: {
            email,
        },
    });
    if (customers || specialists || admins) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email has already been registered');
    }
    password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.specialist.create({
        data: { name, email, password, contactNo, address, image, skill },
    });
    return result;
});
exports.AuthServices = {
    customerSignUp,
    SignIn,
    createAdmin,
    createSpecialist,
};
