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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_interface_1 = require("./user.interface");
const getAllCustomers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_interface_1.customerSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.customer.findMany({
        include: {
            Bookings: true,
        },
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.customer.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_interface_1.customerSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.admin.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllSpecialists = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_interface_1.customerSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.specialist.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            Services: true,
        },
    });
    const total = yield prisma_1.default.specialist.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getMyProfileInfo = (email, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid email');
    }
    if (!role ||
        (role !== user_1.ENUM_USER_ROLE.ADMIN &&
            role !== user_1.ENUM_USER_ROLE.CUSTOMER &&
            role !== user_1.ENUM_USER_ROLE.SPECIALIST)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'invalid role');
    }
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield prisma_1.default.admin.findUnique({
            where: {
                email,
            },
        });
        return result;
    }
    if (role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        const result = yield prisma_1.default.customer.findUnique({
            where: {
                email,
            },
        });
        return result;
    }
    if (role === user_1.ENUM_USER_ROLE.SPECIALIST) {
        const result = yield prisma_1.default.specialist.findUnique({
            where: {
                email,
            },
        });
        return result;
    }
    else {
        return 'profile data not found';
    }
});
const updateMyProfile = (email, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contactNo, address, image, role, skill } = updateData;
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        const newData = { name, contactNo, address, image };
        const result = yield prisma_1.default.admin.update({
            where: {
                email,
            },
            data: newData,
        });
        return result;
    }
    else if (role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        const newData = { name, contactNo, address, image };
        const result = yield prisma_1.default.customer.update({
            where: {
                email,
            },
            data: newData,
        });
        return result;
    }
    else if (role === user_1.ENUM_USER_ROLE.SPECIALIST) {
        const newData = { name, contactNo, address, image, skill };
        const result = yield prisma_1.default.specialist.update({
            where: {
                email,
            },
            data: newData,
        });
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_MODIFIED, 'failed to update data');
    }
});
const deleteAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.delete({
        where: {
            email,
        },
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const customer = await prisma.customer.findFirst({
    //   where: {
    //     email,
    //   },
    // });
    // if (!customer) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'Customer Not Found');
    // }
    try {
        yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.bookings.deleteMany({
                where: { customerId: id },
            });
            yield tx.customer.delete({
                where: { id },
            });
        }));
        return { message: 'Customer and their bookings deleted successfully' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FAILED_DEPENDENCY, 'Failed to delete customer and his bookings');
    }
});
const deleteSpecialist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialist.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.UserServices = {
    getAllCustomers,
    getAllAdmins,
    getAllSpecialists,
    getMyProfileInfo,
    updateMyProfile,
    deleteAdmin,
    deleteCustomer,
    deleteSpecialist,
};
