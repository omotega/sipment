import { Router } from 'express';

const commentRouter = Router();

import { createComment,deleteComment } from '../controllers/comment';
import { authGuard } from '../middleware/auth'


commentRouter.route('/:commentId').delete(authGuard,deleteComment);
commentRouter.route('/:InventoryId').post(authGuard,createComment);

export default commentRouter;