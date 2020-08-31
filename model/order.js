const debug = require("debug")("mongo:model-order");
const mongo = require("mongoose");

module.exports = db => {
  // create a schema
  let schema = new mongo.Schema(
    {
      _id: String,
      userEmail: String,
      productsList: Array, //array of {productId, color, count}
      address: String,
      paymentDetails: String,
      isDeleted: Boolean,
      created_at: Date,
      updated_at: Date
    },
    { autoIndex: false }
  );

  // custom method to add string to end of name
  // you can create more important methods like name validations or formatting
  // you can also do queries and find similar users

  schema.statics.CREATE = async function(order) {
    return this.create({
      _id: order[0],
      userEmail: order[1],
      productsList: order[2],
      address: order[3],
      paymentDetails: order[4],
      isDeleted: order[5]
    });
  };

  // on every save, add the date
  schema.pre("save", function(next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;
    next();
  });

  schema.statics.REQUEST = async function() {
    // no arguments - bring all at once
    const args = Array.from(arguments); // [...arguments]
    if (args.length === 0) {
      debug("request: no arguments - bring all at once");
      return this.find({}).exec();
    }

    // perhaps last argument is a callback for every single document
    let callback = arguments[arguments.length - 1];
    if (callback instanceof Function) {
      let asynch = callback.constructor.name === "AsyncFunction";
      debug(`request: with ${asynch ? "async" : "sync"} callback`);
      args.pop();
      let cursor, order;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }
      try {
        while (null !== (order = await cursor.next())) {
          if (asynch) {
            try {
              await callback(order);
            } catch (err) {
              throw err;
            }
          } else {
            callback(order);
          }
        }
      } catch (err) {
        throw err;
      }
      return;
    }

    // request by id as a hexadecimal string
    if (args.length === 1 && typeof args[0] === "string") {
      debug("request: by ID");
      return this.findById(args[0]).exec();
    }

    // There is no callback - bring requested at once
    debug(`request: without callback: ${JSON.stringify(args)}`);
    return this.find(...args).exec();
  };

  schema.statics.UPDATE = async function(order) {
    const filter = { _id: order._id };
    const update = {
      userEmail: order.userEmail,
      productsList: order.productsList,
      address: order.address,
      paymentDetails: order.paymentDetails,
      isDeleted: order.isDeleted
    };

    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.statics.DELETE = async function(order) {
    const filter = { _id: order._id };
    const update = { isDeleted: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  // the schema is useless so far
  // we need to create a model using it
  // db.model('order', schema, 'order'); // (model, schema, collection)
  db.model("Order", schema); // if model name === collection name
  debug("Order model created");
};
