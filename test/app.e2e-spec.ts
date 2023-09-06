import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateOrderRequestDto } from '../src/oms/dto/create-order.dto';
import { uuid } from 'uuidv4';
jest.useRealTimers();

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createOrderDto: CreateOrderRequestDto;
  const userId = uuid();
  let authKeyValid;
  beforeEach(async () => {
    authKeyValid = '1510480e-d9f2-11ed-afa1-0242ac120002';
    createOrderDto = {
      user_id: userId,
      services: [
        {
          name: 'Pencil',
          amount: 12,
        },
        {
          name: 'Pen',
          amount: 13,
        },
      ],
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test case covering create order.
  it('/ (POST- CREATE ORDER) - 1', async () => {
    // User is unauthorised
    const resp = await request(app.getHttpServer())
      .post('/order-management')
      .send(createOrderDto);
    expect(resp.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('/ (POST- CREATE ORDER) - 2', async () => {
    // authorised user
    const resp = await request(app.getHttpServer())
      .post('/order-management')
      .set('Authorization', authKeyValid)
      .send(createOrderDto);
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body['user_id']).toBe(userId);
    expect(resp.body['services'][0]['name']).toBe('Pencil');
    expect(resp.body['services'][0]['amount']).toBe(12);
    expect(resp.body['services'][1]['amount']).toBe(13);
    expect(resp.body['services'][1]['name']).toBe('Pen');
  });
});