import mongoose from "mongoose";

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
  stock: {
    name: string;
    description: string;
    size: string;
    stockNumber: number;
  };
}

export interface Icomment {
    inventory:string;
    user_id: string,
    inventory_id:string,
    comment:number;
}