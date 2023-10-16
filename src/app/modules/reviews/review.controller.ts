import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewServices } from './review.services';

const postReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.postReview(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review posted successfully',
    data: result,
  });
});

const getMyReview = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await ReviewServices.getMyReview(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review fetched successfully',
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review fetched successfully',
    data: result,
  });
});

export const ReviewController = {
  postReview,
  getMyReview,
  getAllReview,
};
