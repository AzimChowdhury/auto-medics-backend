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

const getMyProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { email, role } = req.query;

  const result = await UserServices.getMyProfileInfo(
    email as string,
    role as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile info fetched successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { email, ...updateData } = req.body;
  const result = await UserServices.updateMyProfile(
    email as string,
    updateData as any
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile info updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await UserServices.deleteAdmin(email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successfully',
    data: result,
  });
});

export const UserController = {
  getAllCustomers,
  getAllAdmins,
  getAllSpecialists,
  getMyProfileInfo,
  updateMyProfile,
  deleteAdmin,
};
