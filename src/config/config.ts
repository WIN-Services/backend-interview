export interface Config {
  name: string;
  env: string;
  port: number;
  oms_secret_key: string;
  databases: {
    mongo_db: MongoDb;
  };
}

export interface MongoDb {
  url: string;
}

export const Configs = (): Config => {
  let url = process.env.DATABASE_MONGO_URL;
  if (url === null || url === undefined) {
    url = 'mongodb://root:root@0.0.0.0:27017';
  }
  return {
    name: 'oms',
    oms_secret_key: process.env.OMS_SECRET_KEY,
    env: process.env.APP_ENVIROMENT,
    port: parseInt(process.env.APP_PORT) || parseInt('3000'),
    databases: {
      mongo_db: {
        url: url,
      },
    },
  };
};
