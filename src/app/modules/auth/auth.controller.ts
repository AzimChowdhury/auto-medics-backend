import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.services';

const SignUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.SignUp(req.body);

  if (result?.accessToken) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'create successful',
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

export const AuthController = {
  SignUp,
};
