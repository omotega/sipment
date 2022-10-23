import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import dbConnect from './config/db';
import userRouter from './routes/userroute'
import { CustomRequest } from './utils/interface';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

declare global {
    namespace Express{
        interface Request extends CustomRequest{}
    }
}

require('./config/passport');

dbConnect();

app.get('/',(req,res) => {
    res.send('welcome to sipment');
})

app.use('/api/v1/users', userRouter);

app.listen(port,() => {
    console.log(`listening on port ${port}`);
})

