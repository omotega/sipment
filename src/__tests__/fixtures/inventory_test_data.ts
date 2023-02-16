import mongoose from "mongoose";


const userId = new mongoose.Types.ObjectId().toString();
const commentId = new mongoose.Types.ObjectId().toString();

function totalPrice(stockNumber:number,stockPrice:number) {
  const totalAmount =  stockPrice * stockNumber;
  return totalAmount;
}

const stockNumber = 400;
const stockPrice = 100;
export const inventoryPayload1 = {
  name: 'inventory1',
  description: 'this is the first inventory',
  size: 'l',
  stockNumber: stockNumber,
  stockPrice: stockPrice,
  totalPrice: totalPrice(stockNumber, stockPrice),
  user_id: userId,
  comment: [commentId],
};

export const inventoryPayload2 = {
  name: 'inventory2',
  description: 'this is the secondary inventory',
  size: 'medium',
  stockNumber: stockNumber,
  stockPrice: stockPrice,
  totalPrice: totalPrice(stockNumber, stockPrice),
  user_id: userId,
  comment: [commentId],
};

export const inventoryPayload3 = {
  name: 'inventory3',
  description: 'this is the third inventory',
  size: 'small',
  stockNumber: stockNumber,
  stockPrice: stockPrice,
  totalPrice: totalPrice(stockNumber, stockPrice),
  user_id: userId,
  comment: [commentId],
};

export const inventoryPayload4 = {
  name: 'inventory4',
  description: 'this is the fourth inventory',
  size: 'larger',
  stockNumber: stockNumber,
  stockPrice: stockPrice,
  totalPrice: totalPrice(stockNumber, stockPrice),
  user_id: userId,
  comment: [commentId],
};

export const inventoryPayload5 = {
  name: 'inventory4',
  description: 'this is the fifth inventory',
  size: 'largeest',
  stockNumber: stockNumber,
  stockPrice: stockPrice,
  totalPrice: totalPrice(stockNumber, stockPrice),
  user_id: userId,
  comment: [commentId],
};

export const userPayload = {
  _id: '63cf294b563406e21cfc4d5f',
  username: 'tega2345',
};

