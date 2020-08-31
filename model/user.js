const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

module.exports = db => {
  // create a schema
  let schema = new mongo.Schema(
    {
      _id: String,
      firstName: String,
      lastName: String,
      emailAddress: { type: String, required: true, unique: true, index: true },
      password: { type: String },
      userType: String,
      image: String,
      savedItemsList: Array, //({ productId: Number }),// without color: String
      cartItemsList: Array, //({ productId: Number, count: Number, color: String }),
      orderList: Array, //({orderId})
      address: String,
      isDeleted: Boolean,
      created_at: Date,
      updated_at: Date
    },
    { autoIndex: false }
  );

  // custom method to add string to end of name
  // you can create more important methods like name validations or formatting
  // you can also do queries and find similar users

  schema.statics.CREATE = async function(user) {
    return this.create({
      _id: user[0],
      firstName: user[1],
      lastName: user[2],
      emailAddress: user[3],
      password: user[4],
      userType: user[5],
      image: user[6],
      savedItemsList: user[7],
      cartItemsList: user[8],
      orderList: user[9],
      address: user[10],
      isDeleted: user[11]
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
      let cursor, user;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }
      try {
        while (null !== (user = await cursor.next())) {
          if (asynch) {
            try {
              await callback(user);
            } catch (err) {
              throw err;
            }
          } else {
            callback(user);
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

  schema.statics.UPDATE = async function(user) {
    const filter = { _id: user._id };
    const update = {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
      userType: user.userType,
      image: user.image,
      savedItemsList: user.savedItemsList,
      cartItemsList: user.cartItemsList,
      orderList: user.userList,
      address: user.address,
      isDeleted: user.isDeleted
    };

    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.statics.DELETE = async function(user) {
    const filter = { _id: user._id };
    const update = { isDeleted: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.plugin(passportLocalMongoose, { usernameField: "emailAddress" });
  // the schema is useless so far
  // we need to create a model using it
  // db.model('Client', schema, 'Client'); // (model, schema, collection)
  db.model("User", schema); // if model name === collection name
  debug("User model created");
};
