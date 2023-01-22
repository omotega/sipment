import { Request, Response } from 'express';
import model from '../models';
import Helper from '../utils/helper';
import { errorResponse, handleError, successResponse } from '../utils/response';

export async function createInventory(req: Request, res: Response) {
  try {
    const { name, description, size, stockNumber, stockPrice } = req.body;
    const totalPrice = await Helper.totalPrice(stockNumber, stockPrice);
    const inventory = await model.Inventory.create({
      name,
      description,
      size,
      stockNumber,
      stockPrice,
      totalPrice,
    });
    return successResponse(res, 201, 'inventory created successfully',inventory);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function editInventory(req:Request,res:Response) {
    try {
        
    } catch (error) {
        
    }
}
