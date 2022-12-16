import { Pool } from "pg";
import { config } from "./config";
const pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 */
 export async function query(query, params) {
    try{
    const {rows, fields} = await pool.query(query, params);

    return rows;
    }catch(err){
      console.log(err)
        return err
    }
}


