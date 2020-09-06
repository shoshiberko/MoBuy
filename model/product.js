const debug = require("debug")("mongo:model-product");
const mongo = require("mongoose");

module.exports = (db) => {
  // create a schema
  let schema = new mongo.Schema(
    {
      _id: String,
      name: String,
      price: Number,
      imagesList: Array, //String's array
      rating: Number,
      numOfRatings: Number,
      moreDetails: Array, //string's list
      colorsList: Array, // string's list (hex color in rgb)
      productType: String,
      company: String,
      commentsList: Array, //array of comments id (id-s from the comment schema)
      isDeleted: Boolean,
      created_at: Date,
      updated_at: Date,
    },
    { autoIndex: false }
  );

  // custom method to add string to end of name
  // you can create more important methods like name validations or formatting
  // you can also do queries and find similar users

  schema.statics.CREATE = async function (product) {
    return this.create({
      _id: product[0],
      name: product[1],
      price: product[2],
      imagesList: product[3],
      rating: product[4],
      numOfRatings: product[5],
      moreDetails: product[6],
      colorsList: product[7],
      productType: product[8],
      company: product[9],
      commentsList: product[10],
      isDeleted: product[11],
    });
  };

  // on every save, add the date
  schema.pre("save", function (next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;
    next();
  });

  schema.statics.REQUEST = async function () {
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
      let cursor, product;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }
      try {
        while (null !== (product = await cursor.next())) {
          if (asynch) {
            try {
              await callback(product);
            } catch (err) {
              throw err;
            }
          } else {
            callback(product);
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

  schema.statics.UPDATE = async function (product) {
    const filter = { _id: product._id };
    const update = {
      name: product.name,
      price: product.price,
      imagesList: product.imagesList,
      rating: product.rating,
      numOfRatings: product.numOfRatings,
      moreDetails: product.moreDetails,
      colorsList: product.colorsList,
      productType: product.productType,
      company: product.company,
      commentsList: product.commentsList,
      isDeleted: product.isDeleted,
    };

    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.statics.DELETE = async function (product) {
    const filter = { _id: product._id };
    const update = { isDeleted: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  // the schema is useless so far
  // we need to create a model using it
  // db.model('Product', schema, 'Product'); // (model, schema, collection)
  db.model("Product", schema); // if model name === collection name
  debug("Product model created");
};
