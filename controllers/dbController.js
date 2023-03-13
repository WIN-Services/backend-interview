const db = require('../config/db');


const getAllOrdersDB = async () => {
  try {
    const query = 'SELECT * FROM orders';
    let data = await db.query(query);
    if (!data || !data.length) throw " failed to fetch orders";
    data = data[0];
    console.log(data);
    return data || [];
  } catch (err) {
    if(err.message) err = err.message;
    console.log("getAllOrdersDB error", err);
    return [];
  }
}

const getOrderByIdDB = async (id) => {
  try {
    const query = `SELECT * FROM orders WHERE id = ${id}`;
    let data = await db.query(query, [id]);
    if (!data || !data.length) throw "failed to fetch order";
    data = data[0];
    return data || [];
  }catch(err) {
    if(err.message) err = err.message;
    console.log("getOrderByIdDB error", err);
    return [];
  }
}


module.exports = {
  getAllOrdersDB,
  getOrderByIdDB
}

