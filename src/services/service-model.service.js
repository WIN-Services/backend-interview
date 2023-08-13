const model = require('../models');

class ServiceModelService {
    
  create(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.service
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
      model.service
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
      model.service
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
      model.service
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
      model.service
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
      model.service
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
      model.service
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
      model.service
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
      model.service
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

module.exports = new ServiceModelService();
