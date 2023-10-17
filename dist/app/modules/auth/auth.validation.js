"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const SignInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.string({
            required_error: 'role is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
    }),
});
const createSpecialistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
        skill: zod_1.z.string({
            required_error: 'Skill is required',
        }),
    }),
});
exports.AuthValidation = {
    SignInZodSchema,
    refreshTokenZodSchema,
    signUpZodSchema,
    createAdminZodSchema,
    createSpecialistZodSchema,
};
