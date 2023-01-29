import mongoose from 'mongoose';

export interface Iuser {
  _id?: string;
  email: string;
  username: string;
  password: string;
}

export interface CustomRequest {
  User: Iuser;
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

export interface Icomment {
  text: string
  inventory: string;
  user_id: string;
  inventory_id: string;
  comment: number;
}

export interface Iwarehouse {
  location: string;
  inventory: [Inventory];
}
