import request from 'supertest';
import app from './app';

import { mockOrderData, mockServiceData } from './mock-data';

jest.mock('./services/database', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllOrders: jest.fn().mockResolvedValue(mockOrderData),
      getOrderById: jest.fn().mockResolvedValue(mockOrderData[0]),
      getAllServices: jest.fn().mockResolvedValue(mockServiceData),
      getServiceById: jest.fn().mockResolvedValue(mockServiceData[0]),
    };
  });
});

describe('Order test suite', () => {
  test('Get All Orders', (done) => {
    request(app)
      .get('/order')
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockOrderData);
        done();
      });
  });

  test('Get Orders By Id', (done) => {
    request(app)
      .get(`/order/${mockOrderData[0].id}`)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockOrderData[0]);
        done();
      });
  });

  test('Get Orders By Invalid Id', (done) => {
    request(app)
      .get(`/order/abc`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  test('Get All Services', (done) => {
    request(app)
      .get('/service')
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServiceData);
        done();
      });
  });

  test('Get Service By Id', (done) => {
    request(app)
      .get(`/service/${mockServiceData[0].id}`)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServiceData[0]);
        done();
      });
  });

  test('Get Service ByInvalid Id', (done) => {
    request(app)
      .get(`/service/abcd`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
