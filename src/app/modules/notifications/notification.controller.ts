import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationServices } from './notification.services';

const createPublicNotification = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await NotificationServices.createPublicNotification(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification created successfully',
      data: result,
    });
  }
);

const getMyNotification = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await NotificationServices.getMyNotification(email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Notification fetched successfully',
    data: result,
  });
});

const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const data = { email: req?.user?.email, notificationId: req.query.id };

  const result = await NotificationServices.updateNotification(data as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification updated successfully',
    data: result,
  });
});

export const NotificationController = {
  createPublicNotification,
  getMyNotification,
  updateNotification,
};
