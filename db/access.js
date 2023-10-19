require('dotenv').config();
const { Pool } = require('pg');

let pool = null;

function initiateConnectionPool(){
    pool = new Pool({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASS,
        port: process.env.DATABASE_PORT,
    })
}

async function endPoolConnection(){
    if(pool){
        await pool.end();
        pool = null;
    }
}

async function query(query,params,client){
    if(!params)
        params = [];
    try {
        if(!client && !pool)
            initiateConnectionPool();
        let queryUpon = client || pool;
        let queryResponse = await queryUpon.query(query, params);
        return queryResponse.rows;
    } catch (err) {
        throw err;
    }
}

const transactionClientMethods = {
    commitTrans : async function(){
        try{
            await this.query('COMMIT');
        }
        catch(err){
            await this.rollBackTrans();
            throw err;
        }
        finally{
            this.release();
        }
    },
    rollBackTrans : async function(){
        try{
            await this.query('ROLLBACK');
        }
        finally{
            this.release();
        }
    },
    safeQuery : async function(queryString,params){
        try{
            let res = await query(queryString,params,this);
            return res;
        }
        catch(err){
            await this.rollBackTrans();
            throw err;
        }
    }
}

async function startDbTransaction(){
    let client;
    try{
        if(!pool)
            initiateConnectionPool();
        client = await pool.connect();
        await client.query('BEGIN');
        Object.keys(transactionClientMethods).forEach((helperKey) => {
            client[helperKey] = transactionClientMethods[helperKey]
        })
        return client
    }
    catch(err){
        if(client){
            await client.query('ROLLBACK');
            client.release();
        }
        throw err;
    }
}

module.exports = {
    query,
    initiateConnectionPool,
    endPoolConnection,
    startDbTransaction
}