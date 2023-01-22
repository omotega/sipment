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
    return successResponse(
      res,
      201,
      'inventory created successfully',
      inventory
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function editInventory(req: Request, res: Response) {
  try {
    let { name, description, size, stockNumber, stockPrice } = req.body;
    const { id } = req.params;
    const inventory = await model.Inventory.findById(id);
    let totalPrice;
    if (!inventory) return errorResponse(res, 400, 'inventory not found');
    if (stockNumber) {
      totalPrice = await Helper.totalPrice(stockNumber, inventory.stockPrice);
    } else if (stockPrice) {
      totalPrice = await Helper.totalPrice(stockPrice, inventory.stockNumber);
    } else {
      totalPrice = await Helper.totalPrice(stockNumber, stockPrice);
    }

    await model.Inventory.findByIdAndUpdate(
      id,
      { name, description, size, stockNumber, stockPrice, totalPrice },
      { new: true }
    );
    return successResponse(
      res,
      200,
      'Inventory updated successfully',
      inventory
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
