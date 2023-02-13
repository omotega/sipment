import { Request, Response } from 'express';
import model from '../models';
import { errorResponse, handleError, successResponse } from '../utils/response';

export async function createWarehouse(req: Request, res: Response) {
  try {
    const { location } = req.body;
    const warehouse = await model.Warehouse.create({ location });
    return successResponse(res, 201, 'warehouse created successfully',warehouse);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}


export async function assignInventory(req: Request, res: Response) {
  try {
    const { inventoryId } = req.params;
    const assign = await model.Inventory.updateOne({
      $push: { inventories: inventoryId },
    });
    return successResponse(res, 200, 'Inventory assigned successfully',assign);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}