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
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const postReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerEmail, rating, comment } = data;
    const customer = yield prisma_1.default.customer.findFirst({
        where: { email: customerEmail },
    });
    if (customer) {
        const previousReview = yield prisma_1.default.reviews.findFirst({
            where: { customerId: customer === null || customer === void 0 ? void 0 : customer.id },
        });
        if (previousReview) {
            const result = yield prisma_1.default.reviews.update({
                where: { customerId: customer === null || customer === void 0 ? void 0 : customer.id },
                data: {
                    rating: rating,
                    comment: comment,
                },
            });
            return result;
        }
        else {
            const submitData = {
                customerEmail,
                customerId: customer === null || customer === void 0 ? void 0 : customer.id,
                rating,
                comment,
            };
            const result = yield prisma_1.default.reviews.create({ data: submitData });
            return result;
        }
    }
    return '';
});
const getMyReview = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.findFirst({
        where: { customerEmail: email },
    });
    return result;
});
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.findMany({ include: { customer: true } });
    return result;
});
exports.ReviewServices = {
    postReview,
    getMyReview,
    getAllReview,
};
