const dynamoDB = require('../dbConnection/db');

const tableName = 'orders';

exports.getAllOrders = async (req, res) => {
  const params = {
    TableName: tableName
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getOrder = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: tableName,
    Key: { id }
  };

  try {
    const data = await dynamoDB.get(params).promise();

    if (!data.Item) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(data.Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.createOrder = async (req, res) => {
    const {id, datetime, totalfee, services } = req.body;
    const params = {
        TableName: tableName,
        FilterExpression: '#datetime > :threeHoursAgo',
        ExpressionAttributeNames: { '#datetime': 'datetime' },
        ExpressionAttributeValues: {
          ':threeHoursAgo': new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        },
      };
  
    try {
      const existingOrder = await dynamoDB.scan(params).promise();
      console.log(existingOrder)
      if (existingOrder.Count > 0) {
        return res.status(409).json({ message: 'An order already exists within 3 hours' });
      }

    } catch (error) {
      if(error.code === 'ConditionalCheckFailedException'){
        return res.status(409).json({ message: 'An order already exists within 3 hours' });
      }
    }
  
    try{
      const order = {
        id: id,
        datetime: datetime,
        totalfee: totalfee,
        services: services
      };
  
      const putParams = {
        TableName: tableName,
        Item: order,
      };
  
      await dynamoDB.put(putParams).promise();
      res.status(201).json(order);
    }catch(error){
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { datetime, totalfee, services } = req.body;
  
    try {
        const params = {
            TableName: tableName,
            FilterExpression: '#datetime > :threeHoursAgo',
            ExpressionAttributeNames: { '#datetime': 'datetime' },
            ExpressionAttributeValues: {
                ':threeHoursAgo': new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            },
        };
      const data = await dynamoDB.scan(params).promise();
  
      if (data.Items.length > 0) {
        return res.status(400).json({ message: 'Order update failed: an order already exists within 3 hours' });
      }
  
      const update = {
        TableName: tableName,
        Key: { id },
        UpdateExpression: 'SET ',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
      };
      
      if (datetime) {
        update.UpdateExpression += '#datetime = :datetime, ';
        update.ExpressionAttributeNames['#datetime'] = 'datetime';
        update.ExpressionAttributeValues[':datetime'] = datetime;
      }
      
      if (totalfee) {
        update.UpdateExpression += '#totalfee = :totalfee, ';
        update.ExpressionAttributeNames['#totalfee'] = 'totalfee';
        update.ExpressionAttributeValues[':totalfee'] = totalfee;
      }
      
      if (services) {
        update.UpdateExpression += '#services = :services, ';
        update.ExpressionAttributeNames['#services'] = 'services';
        update.ExpressionAttributeValues[':services'] = services;
      }

      update.UpdateExpression = update.UpdateExpression.slice(0, -2);

      await dynamoDB.update(update).promise();
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
  
    const params = {
      TableName: tableName,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
      ReturnValues: 'ALL_OLD',
    };
  
    try {
      const data = await dynamoDB.delete(params).promise();
        console.log(data)
      if (!data.Attributes) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  
 
  
