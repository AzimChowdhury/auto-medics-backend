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
exports.NotificationServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createPublicNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, details } = data;
    const result = yield prisma_1.default.publicNotification.create({
        data: { title, details },
    });
    return result;
});
const getMyNotification = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result1 = yield prisma_1.default.publicNotification.findMany();
    const result2 = yield prisma_1.default.myNotification.findMany({ where: { email } });
    const finalResult = [...result1, ...result2];
    const sortedResult = finalResult.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return sortedResult;
});
const updateNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, notificationId } = data;
    const myNotification = yield prisma_1.default.myNotification.findFirst({
        where: { id: notificationId },
    });
    if (myNotification) {
        const result = yield prisma_1.default.myNotification.update({
            where: { id: notificationId },
            data: { readen: true },
        });
        return result;
    }
    else {
        const publicNotification = yield prisma_1.default.publicNotification.findFirst({
            where: { id: notificationId },
        });
        if (publicNotification) {
            const result = yield prisma_1.default.publicNotification.update({
                where: { id: notificationId },
                data: {
                    readers: {
                        push: email,
                    },
                },
            });
            return result;
        }
    }
});
exports.NotificationServices = {
    createPublicNotification,
    getMyNotification,
    updateNotification,
};
