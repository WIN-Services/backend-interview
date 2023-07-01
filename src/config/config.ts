export interface Config {
  env: string;
  context: string;
  port: number;
  databases: {
    mongo_db: MongoDb;
  };
  jwt: {
    secret: string;
  };
}

export interface MongoDb {
  url: string;
}

export const Configs = (): Config => {
  return {
    env: process.env.NODE_ENV || 'dev',
    context: process.env.CONTEXT || 'oms',
    port: parseInt(process.env.APP_PORT) || parseInt('3000'),
    databases: {
      mongo_db: {
        url:
          process.env.DATABASE_MONGO_URL || 'mongodb://root:root@0.0.0.0:27017',
      },
    },
    jwt: {
      secret: 'deff1952d59f883ece260e8683fed21ab0ad9a53323eca4f',
    },
  };
};
