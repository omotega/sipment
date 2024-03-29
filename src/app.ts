import express from 'express'; 
import dotenv from 'dotenv';
dotenv.config();

import route from './routes'

import { CustomRequest } from './utils/interface';


const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

declare global {
    namespace Express{
        interface Request extends CustomRequest{}
    }
}



app.get('/',(req,res) => {
    res.send('welcome to sipment');
})

app.use('/api/v1/users', route.userRouter);
app.use('/api/v1/inventory',route.inventoryRouter);
app.use('/api/v1/comments',route.commentRouter);
app.use('/api/v1/warehouse',route.warehouseRouter);

export default app

