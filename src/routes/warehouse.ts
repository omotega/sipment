import { Router } from 'express'

const warehouseRouter = Router();

import { createWarehouse } from '../controllers/warehouse'
import { authGuard } from '../middleware/auth'

warehouseRouter.route('/create').post(authGuard,createWarehouse);


export default warehouseRouter