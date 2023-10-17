"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const reviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerEmail: zod_1.z.string({
            required_error: 'customer email is required',
        }),
        rating: zod_1.z.number({
            required_error: 'rating is required',
        }),
        comment: zod_1.z.string({
            required_error: 'comment is required',
        }),
    }),
});
exports.ReviewValidation = {
    reviewSchema,
};
