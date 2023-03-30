const 
mySql       = require("mysql"),
connection  = mySql.createConnection({
    "host": "localhost",
    "user": "root",
    "password":"root", // add db password
    "database":"WIN"
});

const orders = [];

// Endpoint to get all orders
exports.getOrders=(req,res)=>{
    var query = `Select * from order_details;`;
    connection.query(query, (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result);
    })
};

// Endpoint to create a new order
exports.createOrders = (req, res) => {
    const { id, name, price } = req.body;
        
    // Check if an order with the same id exists within 3 hours
    const existingOrder = orders.find((order) => {
        return order.id === id && new Date(order.timestamp) > new Date() - 1000 * 60 * 60 * 3;
    });
    var query = `Insert into order_details(id,name,price) values('${id}', '${name}', ${price});`;
    connection.query(query, (err, result) => { 
            if (existingOrder || err) {
                res.status(404).json({ error: 'An order with the same ID was already created within the last 3 hours.' });
            }
         else {
            orders.push({ id, name, price, timestamp: new Date() });
            res.status(200).json({ message: 'Order created successfully.' });
        }
    })
    
};
  
// Endpoint to get a specific order
exports.getSpecificOrders = (req, res) => {
    const query = `Select * from order_details where id = ${req.params.id};`;
    connection.query(query, (err, result) => {
        if(err){
            res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).send(result);
    })
  
};

// Endpoint to delete an existing order
exports.deleteOrder = (req, res) => {
    //const orderIndex = orders.findIndex((order) => order.id === req.params.id);
    var query;
    query = `Delete from order_details where id = ${req.params.id};`;
    connection.query(query, (err, result) => {
    if(err){
        res.status(404).json({ error: 'Order not found.' });
    }
    res.send("Data Deleted!!");
    })
};

// Endpoint to update an existing order
exports.updateOrder = (req, res) => {

    const
    id          = req.params.id,
    name        = req.body.name,
    price       = req.body.price;

    var query = `Update order_details set name = '${name}', price = ${price} WHERE id = ${id};`;
    connection.query(query, (err, result) => {
    if(err){
        throw err;
    }
    res.send("Data Updated!");
    })    
};