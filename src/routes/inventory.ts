import { Router } from 'express'

const inventoryRouter = Router();

import { createInventory,editInventory,deleteInventory,allInventory,getInventoryById } from '../controllers/inventory'
import { authGuard } from '../middleware/auth';


inventoryRouter.route('/').get(allInventory);
inventoryRouter.route('/create').post(authGuard,createInventory);
inventoryRouter.route('/edit/:inventoryId').put(authGuard,editInventory);
inventoryRouter.route('/:inventoryId').get(getInventoryById).delete(authGuard,deleteInventory);


export default inventoryRouter;