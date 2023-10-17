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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const Date_1 = require("../../../helpers/Date");
const sendMail_1 = require("../../../helpers/sendMail");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllBookings = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, email } = data;
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield prisma_1.default.bookings.findMany({
            include: {
                service: true,
                customer: true,
            },
        });
        return result;
    }
    else if (role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        const customer = yield prisma_1.default.customer.findFirst({ where: { email } });
        const result = yield prisma_1.default.bookings.findMany({
            where: { customerId: customer === null || customer === void 0 ? void 0 : customer.id },
            include: { service: true, customer: true },
        });
        return result;
    }
    else if (role === user_1.ENUM_USER_ROLE.SPECIALIST) {
        const specialist = yield prisma_1.default.specialist.findFirst({
            where: { email },
            include: { Services: true },
        });
        if (specialist) {
            const serviceIds = specialist.Services.map(service => service.id);
            const bookings = yield prisma_1.default.bookings.findMany({
                where: {
                    serviceId: {
                        in: serviceIds,
                    },
                },
                include: {
                    service: true,
                    customer: true,
                },
            });
            return bookings;
        }
    }
});
const deleteBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookings.delete({
        where: {
            id,
        },
    });
    return result;
});
const createBookings = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, serviceId, timeSlot } = data;
    const customer = yield prisma_1.default.customer.findFirst({
        where: {
            email,
        },
    });
    if (!customer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const bookingData = { customerId: customer === null || customer === void 0 ? void 0 : customer.id, serviceId, timeSlot };
    const result = yield prisma_1.default.bookings.create({ data: bookingData });
    if (result === null || result === void 0 ? void 0 : result.id) {
        const service = yield prisma_1.default.services.findFirst({
            where: { id: result === null || result === void 0 ? void 0 : result.serviceId },
            include: { specialist: true },
        });
        const admins = yield prisma_1.default.admin.findMany();
        const date = (0, Date_1.ISOStringToDate)(timeSlot);
        const time = (0, Date_1.ISOStringToTime)(timeSlot);
        yield (0, sendMail_1.sendMailToCustomer)({ service, customer, date, time });
        yield (0, sendMail_1.sendMailToSpecialist)({
            service,
            specialist: service === null || service === void 0 ? void 0 : service.specialist,
            customer,
            date,
            time,
        });
        yield (0, sendMail_1.sendMailToAdmins)({
            service,
            specialist: service === null || service === void 0 ? void 0 : service.specialist,
            customer,
            admins,
            date,
            time,
        });
    }
    return result;
});
exports.BookingServices = {
    getAllBookings,
    deleteBookings,
    createBookings,
};
