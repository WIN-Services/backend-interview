const db = require('../config/db');

const getAllOrdersDB = async () => {
  try {
    const query = 'SELECT * FROM orders';
    let data = await db.query(query);
    if (!data || !data.length) throw " failed to fetch orders";
    data = data[0];
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

const createOrderDB = async (totalfee, services, createdAt) => {
  try {
    console.log("createOrderDB called");
    const query = `INSERT INTO orders (totalfee, services, createdat, updatedat) VALUES (${totalfee}, '${services}', '${createdAt}', '${createdAt}') RETURNING *`;
    let data = await db.query(query);
    if (!data) throw "failed to insert data";
    data = data[0];
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("createOrderDB error", err);
    return [];
  }
}

const updateOrderDB = async (id, totalfee, services, updatedAt) => {
  try {
    console.log("updateOrderDB called");
    const query = `UPDATE orders SET totalfee = ${totalfee}, services = '${services}', updatedat = '${updatedAt}' WHERE id = ${id} RETURNING *`;
    let data = await db.query(query);
    if (!data || !data.length) throw "failed to update data";
    data = data[0];
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("updateOrderDB error", err);
    return [];
  }
}

const deleteOrderDB = async (id) => {
  try {
    const query = `DELETE FROM orders WHERE id = ${id}`;
    let data = await db.query(query);
    if(!data || !data.length) throw " failed to delete order";
  } catch (err) {
    if (err.message) err = err.message;
    console.log("deleteOrderDB error", err);
  }
}

const existingOrderCheckDB = async (currentTime, acceptedTime) => {
  try{
    console.log("existingOrderCheckDB called");
  const query = `SELECT * FROM orders WHERE updatedAt >= '${acceptedTime}' AND updatedAt <= '${currentTime}'`;
  const data = await db.query(query);
  if(!data.length) throw "No data found";
  return true;
}catch(err){
  console.log("existingOrderCheckDB error",err);
  return false;
}
}

module.exports = {
  createOrderDB,
  updateOrderDB,
  deleteOrderDB,
  getAllOrdersDB,
  getOrderByIdDB,
  existingOrderCheckDB
}

