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
exports.ServicesService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_interface_1 = require("./service.interface");
const createServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.create({
        data,
    });
    return result;
});
const getAllServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_interface_1.ServiceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.services.findMany({
        include: {
            Bookings: true,
            specialist: true,
        },
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.services.count({
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
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ServicesService = {
    createServices,
    getAllServices,
    deleteService,
};
