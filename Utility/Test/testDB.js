export default class TestDBFunction {
  constructor(DB) {
    this.db = DB;
  }

  async DBQuery(
    collection = "",
    method = "",
    query = {},
    options = {},
    handler = null
  ) {
    if (collection) {
      switch (method) {
        case "find": {
          return await this.find(collection, query, options, handler);
        }
        case "findOne": {
          return await this.findOne(collection, query, options, handler);
        }
        case "insertOne": {
          return await this.insertOne(collection, query, options, handler);
        }
        case "updateOne": {
          return await this.updateOne(collection, query, options, handler);
        }
        case "delete": {
          return await this.delete(collection, query, options, handler);
        }
      }
    }
  }

  async find(collection = "", query = {}, options = {}, handler = null) {
    const response = await this.db.collection(collection).find().toArray();
    return response;
  }

  async findOne(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).findOne(query);
  }

  async insertOne(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).insertOne(query);
  }

  async updateOne(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).updateOne(query, {
      $set: options,
    });
  }

  async delete(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).deleteOne(query);
  }
}
