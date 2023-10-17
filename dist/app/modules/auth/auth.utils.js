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
exports.AuthUtils = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const comparePassword = (enteredPassword, storedPassword, role, email) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(enteredPassword, storedPassword, (err, result) => {
            if (err) {
                reject(new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Password comparison error'));
            }
            else if (result) {
                const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
                const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
                resolve({
                    accessToken,
                    refreshToken,
                });
            }
            else {
                reject(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password did not match'));
            }
        });
    });
});
exports.AuthUtils = {
    comparePassword,
};
