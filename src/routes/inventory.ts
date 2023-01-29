import { Router } from 'express'

const inventoryRouter = Router();

import { createInventory,editInventory,deleteInventory,allInventory } from '../controllers/inventory'
import { authGuard } from '../middleware/auth';


inventoryRouter.route('/edit/:inventoryId').put(authGuard,editInventory);
inventoryRouter.route('/').get(allInventory);
inventoryRouter.route('/create').post(authGuard,createInventory);
inventoryRouter.route('/inventoryId').delete(authGuard,deleteInventory);


export default inventoryRouter;