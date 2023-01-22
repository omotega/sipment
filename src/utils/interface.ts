import mongoose from 'mongoose';

export interface Iuser {
  email: string;
  username: string;
  password: string;
}

export interface CustomRequest {
  user: Iuser;
  file: object;
  params: object;
  query: object;
  path: object;
}

export interface Inventory {
  name: string;
  description: string;
  size: string;
  stockNumber: number;
  stockPrice: number;
  totalPrice: number;
}


