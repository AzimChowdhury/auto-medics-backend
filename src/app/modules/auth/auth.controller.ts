import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.services';

const customerSignUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.customerSignUp(req.body);

  if (result?.accessToken) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'creation successful',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_IMPLEMENTED,
      success: false,
      message: 'creation failed',
      data: result,
    });
  }
});

const SignIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.SignIn(req.body);
  if (result?.accessToken) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Log in successful',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_IMPLEMENTED,
      success: false,
      message: 'Log in  failed',
      data: result,
    });
  }
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin created successfully',
    data: result,
  });
});

const createSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createSpecialist(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialist create successfully',
    data: result,
  });
});

export const AuthController = {
  customerSignUp,
  SignIn,
  createAdmin,
  createSpecialist,
};
