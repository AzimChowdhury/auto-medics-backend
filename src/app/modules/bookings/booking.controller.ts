import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingServices } from './booking.services';

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings fetched successfully',
    data: result,
  });
});

const deleteBookings = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await BookingServices.deleteBookings(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings deleted successfully',
    data: result,
  });
});

export const BookingController = {
  getAllBookings,
  deleteBookings,
};
