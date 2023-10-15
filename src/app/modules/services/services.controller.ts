import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ServiceFilterableFields } from './service.interface';
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

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ServiceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await ServicesService.getAllServices(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteServices = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await ServicesService.deleteService(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createServices,
  getAllServices,
  deleteServices,
};
