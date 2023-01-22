import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import config from './config'
import swaggerDocs from './utils/swagger'

const port:number = config.configs.PORT

config.dbConnect();

app.listen(port,() => {
    console.log(`listening on port ${port}`);
    swaggerDocs(app,port);
})