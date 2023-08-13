const model = require('../models');

class OrderServicesModelService {
    
  create(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .create(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }

  
  findByPk(queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .findByPk(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findOne(queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .findOne(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findAll(queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .findAll(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findAndCountAll(queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .findAndCountAll(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  update(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .update(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }

  save(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .save(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }


  destroy(queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .destroy(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }

  bulkCreate(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.order_service
        .bulkCreate(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }
}

module.exports = new OrderServicesModelService();
