

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '.env') });

const envVarsSchema = Joi.object()
  .keys({
    // Common
    NODE_ENV: Joi.string().valid('development', 'localhost','test').default('development'),
    PORT: Joi.number().default(3000),
    REST_API_KEY: Joi.string().required(),
   
    //Development
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_DIALECT: Joi.string().required(),

  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    username: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DB,
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    dialect: envVars.POSTGRES_DIALECT,
};
