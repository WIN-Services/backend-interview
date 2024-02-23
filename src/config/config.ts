export interface Config {
  env: string;
  context: string;
  port: number;
  databases: {
    mongo_db: MongoDb;
  };
  admin_secret_key: string;
  jwt: {
    key: string;
    secret: string;
    expires_in: string;
  };
}

export interface MongoDb {
  url: string;
}

export const Configs = (): Config => {
  return {
    env: process.env.APP_ENVIROMENT || 'dev',
    context: process.env.CONTEXT || 'orders-management-system',
    port: parseInt(process.env.APP_PORT) || parseInt('3000'),
    databases: {
      mongo_db: {
        url:
          process.env.DATABASE_MONGO_URL ||
          'mongodb://localhost:27017/order-management-system',
      },
    },
    jwt: {
      key: '1223425234523',
      secret: 'jldsfjaldjfalksfnasff747539745hfhafa',
      expires_in: '1d',
    },
    admin_secret_key: process.env.ADMIN_SECRET_KEY || "e3fd2ac5-c939-491b-aecf-0666908c071c"
  };
};
