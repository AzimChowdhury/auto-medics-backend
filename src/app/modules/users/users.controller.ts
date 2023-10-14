import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './user.interface';
import { UserServices } from './users.services';

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserServices.getAllCustomers(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserServices.getAllAdmins(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllSpecialists = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserServices.getAllSpecialists(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialists fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  getAllCustomers,
  getAllAdmins,
  getAllSpecialists,
};
