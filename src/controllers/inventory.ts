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
    const { inventoryId } = req.params;
    const inventory = await model.Inventory.findById(inventoryId);
    let totalPrice;
    if (!inventory) return errorResponse(res, 400, 'inventory not found');
    if (stockNumber) {
      totalPrice = await Helper.totalPrice(stockNumber, inventory.stockPrice);
    } else if (stockPrice) {
      totalPrice = await Helper.totalPrice(stockPrice, inventory.stockNumber);
    } else {
      totalPrice = await Helper.totalPrice(stockNumber, stockPrice);
    }

    const updatedInventory = await model.Inventory.findByIdAndUpdate(
      inventoryId,
      { name, description, size, stockNumber, stockPrice, totalPrice },
      { new: true }
    );
    return successResponse(
      res,
      200,
      'Inventory updated successfully',
      updatedInventory
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function deleteInventory(req: Request, res: Response) {
  try {
    const { inventoryId } = req.params;
    const inventory = await model.Inventory.findById(inventoryId);
    if (!inventory) return errorResponse(res, 400, 'inventory not found');
    await model.Inventory.findByIdAndDelete(inventoryId);
    await model.Comment.find({ id: inventoryId }).findByIdAndDelete(
      inventoryId
    );
    return successResponse(res, 200, 'Inventory deleted successfully');
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function allInventory(req: Request, res: Response) {
  try {
    const inventory = await model.Inventory.findOne()
    return successResponse(res, 200, 'inventory gotten', inventory);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
