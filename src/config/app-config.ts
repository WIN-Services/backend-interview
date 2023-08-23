export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT) || 5000,
});
