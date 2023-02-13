import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Helper from '../utils/helper';
import model from '../models';

import { inventoryPayload, userPayload } from './fixtures/inventory_test_data';

const api = supertest(app);


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
        await api.get(`/api/v1/inventory/${inventoryId}`).expect(404);
      });
    });

    describe('given the inventory exist', () => {
      it('should return 200 status and inventory', async () => {
        const inventory = await model.Inventory.create(inventoryPayload);
        const { body, statusCode } = await api
          .get(`/api/v1/inventory/${inventory.id}`)
          .expect(200);

        expect(statusCode).toBe(200);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('description');
        expect(body.data).toHaveProperty('size');
        expect(body.data).toHaveProperty('stockNumber');
        expect(body.data).toHaveProperty('stockPrice');
        expect(body.data).toHaveProperty('totalPrice');
        expect(body.data).toHaveProperty('user_id');
        expect(body.data).toHaveProperty('comment');
      });
    });
  });
  describe('create inventory route', () => {
    describe('given that the user is not logged in', () => {
      it('it should return a 403', async () => {
        const { statusCode } = await api.post('/api/v1/inventory/create');
        expect(statusCode).toBe(403);
      });
    });

    describe.skip('given the user is logged in', () => {
      it('it should return a 200 and create an inventory', async () => {
        const token = await Helper.generateToken(userPayload);
        const { statusCode, body } = await api
          .post('/api/v1/inventory/create')
          .set('Authorization', `Bearer ${token}`)
          .send(inventoryPayload);

        expect(statusCode).toBe(201);
      });
    });
  });

  describe('delete inventory route', () => {
    describe('given that the user is logged in', () => {
      it('should return 403', async () => {
        const inventory = await model.Inventory.create(inventoryPayload);
        const { body, statusCode } = await api.delete(
          `/api/v1/inventory/${inventory.id}`
        );

        expect(statusCode).toBe(403);
      });
    });
  });
});
