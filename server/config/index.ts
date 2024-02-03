import dotenv from 'dotenv';
dotenv.config()
export default{
    MYSQLDB:{
        DATABASE_NAME:process.env.DATA_BASE_NAME,
        USERNAME:process.env.DATA_BASE_USERNAME,
        PASSWORD:process.env.DATA_BASE_PASSWORD,
        HOST:process.env.HOST,

    },
    RUNNING_PORT: parseInt(process.env.PORT || '8000'),
    NODE_ENV:'dev',
}
