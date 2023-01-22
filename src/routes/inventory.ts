import { Router } from 'express'

const inventoryRouter = Router();

import { createInventory,editInventory } from '../controllers/inventory'

inventoryRouter.route('/edit/:id').put(editInventory);
inventoryRouter.route('/create').post(createInventory);


export default inventoryRouter;