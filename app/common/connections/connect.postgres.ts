import { dataSource } from '../config/orm.config';

export const connectToPostgres = async () => {
  try {
    await dataSource.initialize();
    console.log('CONNECTED TO POSTGRES');
    return true;
  } catch (e) {
    console.log(e);
    throw 'COULD NOT CONNECT TO POSTGRES';
  }
};
