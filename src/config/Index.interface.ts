import config from './Config';

export interface IAppConfig {
  app: {
    frontend: {
      baseUrl: string;
      registration: string;
      forgotPassword: string;
    };
    backend: {
      baseUrl: string;
    };
  };
  aws: {
    defaultRegion: string;
    ses: {
      region: string;
      host: string;
      port: number;
      fromEmail: string;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
    cloudWatchLogs: {
      apiVersion: string;
      region: string;
      logGroupName: string;
    };
    s3: {
      bucket: string;
    };
  };
  ormconfig: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging: boolean;
  };
  contactUsEmail: string;
  server: string;
  cookies: {
    cookieSecureSetting: boolean;
    sameSite?: string;
    domain?: string;
    maxAge: number;
  };
  corsSettings: {
    origin: string[];
    website: string[];
    exposeHeaders: string[];
  };
}

const appConfig: IAppConfig = config;

export default appConfig;
