import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServicesService } from './services.services';

const createServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.createServices(req.body);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'service added  successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_IMPLEMENTED,
      success: false,
      message: 'failed to add services',
      data: result,
    });
  }
});

export const ServiceController = {
  createServices,
};
