import { Request, Response } from 'express';
import model from '../models';
import { errorResponse, handleError, successResponse } from '../utils/response';

export async function createComment(req: Request, res: Response) {
  try {
    const { _id } = req.User;
    const { inventoryId } = req.params;
    const { text } = req.body;
    const reply = await model.Comment.create({
      comment: text,
      user_id: _id,
      inventory_id: inventoryId,
    });
    return successResponse(res, 201, 'comment created', reply);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function deleteComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const comment = await model.Comment.findOneAndDelete({
      commentId: commentId,
    });
    return successResponse(res, 200, 'comment deleted');
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
