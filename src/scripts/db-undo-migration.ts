import { pool } from '../node-postgres';
import { TABLES } from '../constant/tables';

export const undoMigrate = async () => {
  const client = await pool.connect();
  await client.query('BEGIN');
  await client.query(`DROP TABLE IF EXISTS ${TABLES.order_service.table_name}`);
  await client.query(`DROP TABLE IF EXISTS ${TABLES.order.table_name}`);
  await client.query(`DROP TABLE IF EXISTS ${TABLES.service.table_name}`);

  await client.query('COMMIT');
  console.log('>>>>>>>>>>>>>>>>>>>>>   Undo Migrations completed   >>>>>>>>>>>>>>>>>>>>>');
  client.release();
};
