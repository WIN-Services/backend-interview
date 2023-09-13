import { pool } from '../node-postgres';
import { TABLES } from '../constant/tables';

export const migrate = async () => {
  const client = await pool.connect();
  await client.query('BEGIN');

  await client.query(`CREATE TABLE IF NOT EXISTS ${TABLES.service.table_name} (
    ${TABLES.service.service_id} SERIAL PRIMARY KEY,
    ${TABLES.service.name} VARCHAR(100) NOT NULL,
    ${TABLES.service.fee} FLOAT
    )`);

  await client.query(`CREATE TABLE IF NOT EXISTS ${TABLES.order.table_name} (
    ${TABLES.order.order_id} SERIAL PRIMARY KEY,
    ${TABLES.order.datetime} TIMESTAMPTZ,
    ${TABLES.order.totalfee} FLOAT,
    ${TABLES.order.active} BOOLEAN DEFAULT TRUE
    )`);

  await client.query(`CREATE TABLE IF NOT EXISTS ${TABLES.order_service.table_name} (
    ${TABLES.order_service.order_service_id} SERIAL PRIMARY KEY,
    ${TABLES.order_service.service_id} INT,
    ${TABLES.order_service.order_id} INT,
      CONSTRAINT fk_service_id FOREIGN KEY (${TABLES.order_service.service_id}) REFERENCES ${TABLES.service.table_name}(${TABLES.service.service_id}),
      CONSTRAINT fk_order_id FOREIGN KEY (${TABLES.order_service.order_id}) REFERENCES ${TABLES.order.table_name}(${TABLES.order.order_id})
    )`);

  await client.query(
    `INSERT INTO ${TABLES.service.table_name} (${TABLES.service.name}, ${TABLES.service.fee}) VALUES ('Inspection', 100), ('Testing', 200), ('Analysis', 150)`,
  );

  await client.query(
    `INSERT INTO ${TABLES.order.table_name} (${TABLES.order.totalfee}, ${
      TABLES.order.datetime
    }) VALUES (100, '${new Date().toISOString()}'), (200, '${new Date().toISOString()}'), (150, '${new Date().toISOString()}')`,
  );

  await client.query(
    `INSERT INTO ${TABLES.order_service.table_name} (${TABLES.order_service.service_id}, ${TABLES.order_service.order_id}) VALUES (1,1), (2,2), (3,3)`,
  );

  await client.query('COMMIT');
  console.log('>>>>>>>>>>>>>>>>>>>>>   Migrations completed   >>>>>>>>>>>>>>>>>>>>>');
  client.release();
};
