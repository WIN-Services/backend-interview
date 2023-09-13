export const TABLES = {
  service: {
    table_name: 'service',
    service_id: 'service_id',
    name: 'name',
    fee: 'fee',
  },
  order: {
    table_name: 'orderd',
    order_id: 'order_id',
    datetime: 'datetime',
    totalfee: 'totalfee',
    active: 'active',
  },
  order_service: {
    table_name: 'order_service',
    order_service_id: 'order_service_id',
    order_id: 'order_id',
    service_id: 'service_id',
  },
};
