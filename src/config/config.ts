import dotenv from 'dotenv';

const configs = {
  PORT: Number(process.env.PORT) ,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
};

export default configs;
