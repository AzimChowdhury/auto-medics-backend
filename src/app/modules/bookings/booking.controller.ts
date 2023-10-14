import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingServices } from './booking.services';

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    data: result,
  });
});

export const BookingController = {
  getAllServices,
};
