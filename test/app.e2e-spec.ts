import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppTestModule } from './testModule';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orders (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
      });
  });

  it('/orders (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        "dateTime": "2022-11-11T14:49:43.734Z",
        "totalFee": 0,
        "services": [
          0
        ]
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('id');
      });
  });

  it('/orders (PUT)', () => {
    return request(app.getHttpServer())
      .put('/orders')
      .send({
        "id": 4,
        "totalFee": 0,
        "services": [
          0
        ]
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.text).toBe('Order Updated Successfully');
      });
  });

  it('/orders/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/1')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('id');
      });
  });

  it('/orders/:id (GET) NOT Found', () => {
    return request(app.getHttpServer())
      .get('/orders/0')
      .then((result) => {
        expect(result.statusCode).toEqual(404);
      });
  });

  it('/orders/:id (DELETE)', async () => {
    const create = await request(app.getHttpServer())
      .post('/orders')
      .send({
        "dateTime": "2022-11-11T14:49:43.734Z",
        "totalFee": 0,
        "services": [
          0
        ]
      });
    return request(app.getHttpServer())
      .delete(`/orders/${create.body.id}`)
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.text).toBe('Order Removed Successfully');
      });
  });



  it('/services (GET)', () => {
    return request(app.getHttpServer())
      .get('/services')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
      });
  });

  it('/services (POST)', () => {
    return request(app.getHttpServer())
      .post('/services')
      .send({
        "name": "string"
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('id');
      });
  });

  it('/services (PUT)', () => {
    return request(app.getHttpServer())
      .put('/services')
      .send({
        "id": 4,
        "name": "string"
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.text).toBe('Service Updated Successfully');
      });
  });

  it('/services/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/services/1')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('id');
      });
  });

  it('/services/:id (GET) NOT Found', () => {
    return request(app.getHttpServer())
      .get('/services/0')
      .then((result) => {
        expect(result.statusCode).toEqual(404);
      });
  });

  it('/services/:id (DELETE)', async () => {
    const create = await request(app.getHttpServer())
      .post('/services')
      .send({
        "name": "string"
      });
    return request(app.getHttpServer())
      .delete(`/services/${create.body.id}`)
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.text).toBe('Service Removed Successfully');
      });
  });

  afterAll(async () => {
    await app.close();
  });
  
});
