import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingServices } from './booking.services';

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const data = req.query;
  const result = await BookingServices.getAllBookings(data);

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

const createBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookings(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked successfully',
    data: result,
  });
});

export const BookingController = {
  getAllBookings,
  deleteBookings,
  createBookings,
};
