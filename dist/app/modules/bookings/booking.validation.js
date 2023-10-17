"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookings = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'customer email is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
        timeSlot: zod_1.z.string({
            required_error: 'time and date is required',
        }),
    }),
});
exports.BookingValidation = {
    createBookings,
};
