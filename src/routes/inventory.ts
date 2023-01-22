import { Router } from 'express'

const inventoryRouter = Router();

import { createInventory } from '../controllers/inventory'

inventoryRouter.route('/create').post(createInventory);


export default inventoryRouter;