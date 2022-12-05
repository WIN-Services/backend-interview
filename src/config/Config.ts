export default {
  app: {
    frontend: {
      baseUrl: 'http://localhost:8080',
      registration: '/verification',
      forgotPassword: '/forgot-password',
    },
    backend: {
      PORT: '3000',
      baseUrl: 'http://localhost:3000',
    },
  },
  aws: {
    defaultRegion: 'eu-west-2',
    ses: {
      region: 'eu-west-1',
      host: 'smtp.gmail.com',
      port: 587,
      fromEmail: 'backend@test.com',
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    },
    cloudWatchLogs: {
      apiVersion: '',
      region: 'eu-west-2',
      logGroupName: 'dev',
    },
    s3: {
      bucket: 'bucket-name',
      awsAccessKeyId: '',
      awsSecretAccessKey: '',
      region: '',
    },
  },
  ormconfig: {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'WIN_ORDER',
    logging: true,
  },
  contactUsEmail: 'test@yopmail.com',
  server: 'development',
  cookies: {
    cookieSecureSetting: true,
    sameSite: 'lax',
    domain: 'localhost',
    maxAge: 365 * 86400 * 1000,
  },
  corsSettings: {
    origin: ['http://localhost:5000'],
    website: [],
    exposeHeaders: ['accesstoken', 'Set-Cookie'],
  },
};
