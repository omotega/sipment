import { Router } from 'express'

const warehouseRouter = Router();

import { createWarehouse,assignInventory } from '../controllers/warehouse'
import { authGuard } from '../middleware/auth'

warehouseRouter.route('/create').post(authGuard,createWarehouse);
warehouseRouter.route('/assign').post(authGuard,assignInventory);

export default warehouseRouter