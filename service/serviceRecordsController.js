const serviceRecords = require('../model/serviceRecords');

const addNewServiceData = async (req, res) => {
    const { id, name } = req.body;
  
    try {
      const addService = new serviceRecords({ id, name});
      await addService.save();
      res.send(addService);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const getAllServices = async (req, res) => {
    try {
      const allService = await serviceRecords.find({});;
      res.send(allService);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };


  module.exports = {addNewServiceData,getAllServices}