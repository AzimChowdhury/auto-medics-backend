"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        specialistId: zod_1.z.string({
            required_error: 'specialist Id is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        time: zod_1.z.number({
            required_error: 'time is required',
        }),
        image: zod_1.z.string({
            required_error: 'image is required',
        }),
    }),
});
exports.ServiceValidation = {
    createService,
};
