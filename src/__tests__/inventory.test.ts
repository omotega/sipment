import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Helper from '../utils/helper';
import model from '../models';

import { inventoryPayload1,inventoryPayload2,inventoryPayload3,inventoryPayload4,inventoryPayload5, userPayload } from './fixtures/inventory_test_data';
import { user1, user2, user3, user4 } from './fixtures/user_test_data';

const api = supertest(app);

let users: any;
let inventorys: any;

const register = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const { statusCode, body, error } = await api
    .post('/api/v1/users/signup')
    .send(user);

  users = body;
};

const createInventory = async (inventory: {
  name: string;
  description: string;
  size: string;
  stockNumber: number;
  stockPrice: number;
  totalPrice: number;
}) => {
  await register(user1);
  const token = await Helper.generateToken({
    _id: users.data.id,
    username: users.data.username,
  });
  const { body } = await api
    .post('/api/v1/inventory/create')
    .set('Authorization', `Bearer ${token}`)
    .send(inventory);

  inventorys = body;
 
};

describe('inventory', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get inventory', () => {
    describe('given that the inventory does not exist', () => {
      it('should return a 404', async () => {
        const inventoryId = '635f9d209a39346186b33200';
        const url = `/api/v1/inventory/${inventoryId}`;
        await api.get(url).expect(404);
      });
    });

    describe('given the inventory exist', () => {
      it('should return 200 status and inventory', async () => {
        const url = '/api/v1/inventory';
        await createInventory(inventoryPayload1);
        const inventoryId = inventorys.data._id

        const { body, statusCode,error } = await api
          .get(`${url}/${inventoryId}`)

        expect(statusCode).toBe(200);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('description');
        expect(body.data).toHaveProperty('size');
        expect(body.data).toHaveProperty('stockNumber');
        expect(body.data).toHaveProperty('stockPrice');
        expect(body.data).toHaveProperty('totalPrice');
        expect(body.data).toHaveProperty('comment');

      });
    });
  });
  describe('create inventory route', () => {
    describe('given that the user is not logged in', () => {
      it('it should return a 403', async () => {
        const url = '/api/v1/inventory/create';
        const { statusCode } = await api.post(url);
        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is logged in', () => {
      it('it should return a 200 and create an inventory', async () => {
        const url = '/api/v1/inventory/create';
        await register(user2);
        const token = await Helper.generateToken({
          _id: users.data.id,
          username: users.data.username,
        });
        const { statusCode, body } = await api
          .post(url)
          .set('Authorization', `Bearer ${token}`)
          .send(inventoryPayload2);

        expect(statusCode).toBe(201);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('description');
        expect(body.data).toHaveProperty('size');
        expect(body.data).toHaveProperty('stockNumber');
        expect(body.data).toHaveProperty('stockPrice');
        expect(body.data).toHaveProperty('totalPrice');
        expect(body.data).toHaveProperty('comment');
      });
    });
  });

  describe('delete inventory route', () => {
    describe('given that the user is not logged in', () => {
      it('should return 403', async () => {
        const url = '/api/v1/inventory';
        const inventoryId =  '635f9d209a39346186b33205';
        const { statusCode } = await api.delete(`${url}/${inventoryId}`);

        expect(statusCode).toBe(403);
      });
    });

    describe('given that the inventory does not exist', () => {
      it('should return 404', async () => {
        const inventoryId = '635f9d209a39346186b33208';
         await register(user3);
        const token = await Helper.generateToken({
          _id: users.data.id,
          username: users.data.username,
        });

        const { statusCode,error } = await api
          .delete(`/api/v1/inventory/${inventoryId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(inventoryId);

          
        expect(statusCode).toBe(404);
      });
    });

    describe('given that the user is logged in ', () => {
      it('should delete the inventory and return 200', async () => {
        const url = '/api/v1/inventory';
        await register(user4);
        console.log(users)
        const token = await Helper.generateToken({
          _id: users.data.id,
          username: users.data.username,
        });
        await createInventory(inventoryPayload4);
        const inventoryId = inventorys.data._id
        
        const { statusCode,error } = await api
          .delete(`${url}/${inventoryId}`)
          .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200);
      console.log(error);
        
      });
    });
  });
});
