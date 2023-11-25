import dotenv from "dotenv";
import path from 'path';
export const NODE_ENV = 'example';

const envInit = dotenv.config({
    path: path.resolve(
        __dirname,
        `../.env.${NODE_ENV || 'local'}`
    ),
    encoding: 'utf8'
});
if(envInit.error){
    throw envInit.error;
}

export const PORT = process.env.PORT || 3000;

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/winTech'