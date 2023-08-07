const { buildSuccObject, buildErrObject, itemNotFound } = require("../utils");

/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort, order) => {
  const sortBy = {};
  sortBy[sort] = order;
  return sortBy;
};

/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (result) => {
  result.docs.map((element) => delete element.id);
  return result;
};

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = async (req) => {
  return new Promise((resolve) => {
    const order = req.query.order || -1;
    const sort = req.query.sort || "createdAt";
    const sortBy = buildSort(sort, order);
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const options = {
      sort: sortBy,
      lean: true,
      page,
      limit,
    };
    resolve(options);
  });
};

module.exports = {


  /**
   * Gets items from database
   * @param {Object} req - request object
   * @param model
   * @param {Object} query - query object
   */
  async getItem(req, model, query, noPagination = true) {
    try {
      if (noPagination) {
        return await model.findOne(query, "-_id").lean();
      } else {
        const options = await listInitOptions(req);
        return cleanPaginationID(await model.paginate(query, options));
      }
    } catch (err) {
      return buildErrObject(422, err.message);
    }
  },
  
  /**
   * Gets items from database
   * @param {Object} req - request object
   * @param model
   * @param {Object} query - query object
   */
  async getItems(req, model, query, noPagination = true) {
    try {
      if (noPagination) {
        return await model.find(query, "-_id").lean();
      } else {
        const options = await listInitOptions(req);
        return cleanPaginationID(await model.paginate(query, options));
      }
    } catch (err) {
      return buildErrObject(422, err.message);
    }
  },

  /**
   * Gets items from database
   * @param {Object} req - request object
   * @param model
   * @param {Object} query - query object
   */
  async getItemsMultiCollection(req, model, query, refs) {
    try {
      let items = await model.find(query).populate(refs).exec();
      return items;
    } catch (err) {
      return buildErrObject(422, err.message);
    }
  },

  /**
   * Creates a new item in database
   * @param {Object} req - request object
   * @param model
   */
  async createItem(req, model) {
    try {
      let item = await model.create(req);
      return item;
    } catch (err) {
      return buildErrObject(422, err.message);
    }
  },

  /**
   * Updates an item in database by id
   * @param {string} id - item id
   * @param model
   * @param {Object} req - request object
   */
  async updateItem(id, model, req) {
    try {
      let item = await model.findOneAndUpdate({id}, req, {
        new: true,
        runValidators: true,
      });      
      return item ? item : itemNotFound(null, item, "NOT_FOUND");
    } catch (err) {
      itemNotFound(err, null, "NOT_FOUND");
    }
  },

  /**
   * Deletes an item from database by id
   * @param {string} id - id of item
   */
  async deleteItem(id, model) {
    try {
      let item = await model.findOneAndRemove({id})      
      return item ? buildSuccObject("DELETED") : itemNotFound(null, item, "NOT_FOUND");
    } catch(err) {
      itemNotFound(err, null, "NOT_FOUND");
    }
  },
};
