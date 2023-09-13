import { IService, IOrders } from '../interfaces';

export const mockServiceData: IService[] = [
  {
    id: 1,
    name: 'Inspection',
    fee: 100,
  },
  {
    id: 2,
    name: 'Testing',
    fee: 200,
  },
  {
    id: 3,
    name: 'Analysis',
    fee: 150,
  },
];

export const mockOrderData: IOrders[] = [
  {
    id: 1,
    totalfee: 100,
    datetime: '2023-09-13T04:32:58.576Z',
    services: [
      {
        id: 1,
        name: 'Inspection',
      },
    ],
  },
  {
    id: 2,
    totalfee: 200,
    datetime: '2023-09-13T04:32:58.576Z',
    services: [
      {
        id: 2,
        name: 'Testing',
      },
    ],
  },
  {
    id: 3,
    totalfee: 150,
    datetime: '2023-09-13T04:32:58.576Z',
    services: [
      {
        id: 3,
        name: 'Analysis',
      },
    ],
  },
  {
    id: 4,
    totalfee: 300,
    datetime: '2023-09-13T00:00:00.000Z',
    services: [
      {
        id: 1,
        name: 'Inspection',
      },
      {
        id: 2,
        name: 'Testing',
      },
    ],
  },
  {
    id: 6,
    totalfee: 350,
    datetime: '2023-09-13T00:00:00.000Z',
    services: [
      {
        id: 2,
        name: 'Testing',
      },
      {
        id: 3,
        name: 'Analysis',
      },
    ],
  },
  {
    id: 5,
    totalfee: 350,
    datetime: '2023-09-13T07:31:09.009Z',
    services: [
      {
        id: 2,
        name: 'Testing',
      },
      {
        id: 3,
        name: 'Analysis',
      },
    ],
  },
];
