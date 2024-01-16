import connection from "../utils/dbConnect.js"


const getAllOrders = async (req, res) => {
    try {
        const getQuery = 'select * from orders';
        const result = await connection.query(getQuery);
        if (result.rows.length === 0) {
            // If no data is found, return a 404 (Not Found) status code
            res.status(404).json({ status: 2, code: 2, message: 'No data found' });
        } else {
            // Return the data with a successful HTTP status code
            res.status(200).json({ status: 0, code: 0, data: result.rows });
        }
    } catch (error) {
        res.status(500).json({ status: 1, code: 1, message: error.message });
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const query = `select * from orders where id= '${id}'`;
        const result = await connection.query(query);
        if (result.rows.length === 0) {
            // If no data is found, return a 404 (Not Found) status code
            res.status(404).json({ status: 2, code: 2, message: 'No data found' });
        } else {
            // Return the data with a successful HTTP status code
            res.status(200).json({ status: 0, code: 0, data: result.rows });
        }

    } catch (error) {
        res.status(500).json({ status: 1, code: 1, message: error.message });
    }
}

const deleteOrders = async (req, res) => {
    const { id } = req.body
    try {
        const deleteQuery = `DELETE FROM orders WHERE id = '${id}'`;
        const result = await connection.query(deleteQuery);
        // Check if any rows were affected to determine if the deletion was successful
        if (result.rowCount > 0) {
            res.status(200).json({ status: 0, code: 0, message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ status: 2, code: 2, message: 'No data found for deletion' });
        }
    } catch (error) {
        res.status(500).json({ status: 1, code: 1, message: error.message });
    }
}

const updateOrder = async (req, res) => {
    const { id, totalfee, services } = req.body;
    try {
        const query = `select datetime from orders where id = ${id}`;
        const result = await connection.query(query);
        if (result.rows.length === 0) {
            // If no data is found, return a 404 (Not Found) status code
            const date = new Date();
            const insertQuery = `INSERT INTO orders (id, totalfee, services,  datetime)
            VALUES ('${id}','${totalfee}','${JSON.stringify(services)}'::jsonb, '${date}')
            RETURNING id;`
            const result = await connection.query(insertQuery);
            // Check if the insertion was successful
            if (result.rows.length > 0) {
                const insertedId = result.rows[0].id;
                return res.status(201).json({ status: 0, code: 0, message: 'Data inserted successfully, No previous record found', insertedId });
            } else {
                return res.status(500).json({ status: 1, code: 1, message: 'Failed to insert data' });
            }
        } else {
            const currentDate = new Date();
            const pastDateString = result.rows[0].datetime;
            const pastDate = new Date(pastDateString);
            // Calculate the time difference in milliseconds
            const timeDifferenceInMillis = currentDate - pastDate;

            // Convert milliseconds to seconds
            const timeDifferenceInSeconds = timeDifferenceInMillis / 1000;

            // Convert seconds to hours
            const timeDifferenceInHours = timeDifferenceInSeconds / 3600;

            if (timeDifferenceInHours > 3) {
                const update = `update orders set totalfee = '${totalfee}', services ='${JSON.stringify(services)}'::jsonb, datetime = '${currentDate}'RETURNING id; `;
                const result = await connection.query(update);
                if (result.rows.length > 0) {
                    const insertedId = result.rows[0].id;
                    return res.status(201).json({ status: 0, code: 0, message: 'Data updated successfully', insertedId });
                } else {
                    res.status(500).json({ status: 1, code: 1, message: 'Failed to update data' });
                }

            } else {
                return res.status(400).json({ status: 2, code: 2, message: 'Time Duration less Than 3 hours' });
            }
        }


    } catch (error) {
        res.status(500).json({ status: 1, code: 1, message: error.message });
    }
}

const submitData = async (req, res) => {
    const { id, totalfee, services } = req.body;
    try {
        const date = new Date();
        const insertQuery = `INSERT INTO orders (id, totalfee, services,  datetime)
        VALUES ('${id}','${totalfee}','${JSON.stringify(services)}'::jsonb, '${date}')
        RETURNING id;`
        const result = await connection.query(insertQuery);
        // Check if the insertion was successful
        if (result.rows.length > 0) {
            const insertedId = result.rows[0].id;
            res.status(201).json({ status: 0, code: 0, message: 'Data inserted successfully', insertedId });
        } else {
            res.status(500).json({ status: 1, code: 1, message: 'Failed to insert data' });
        }


    } catch (error) {
        res.status(500).json({ status: 1, code: 1, message: error.message });
    }
}

export { getAllOrders, getOrderById, deleteOrders, submitData, updateOrder }

