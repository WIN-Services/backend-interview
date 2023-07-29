const getOrderQuery = `select id, name from orders`;
const addOrderQuery = `INSERT INTO orders (created_at, total_fee) VALUES ($1, $2);`;
const updateOrderQuery = `UPDATE orders set total_fee = $1 where id = $1`;
const deleteOrderQuery = `DELETE FROM orders where id = $1`;

module.exports = {
    getOrders: getOrderQuery,
    addOrders: addOrderQuery,
    updateOrders: updateOrderQuery,
    deleteOrders: deleteOrderQuery 
}