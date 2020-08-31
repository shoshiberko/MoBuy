const debug = require("debug")("mongo:model-branch");
const mongo = require("mongoose");

module.exports = db => {
  // create a schema
  let schema = new mongo.Schema(
    {
      _id: String, //numOfBrunch
      location: {
        lat: Number,
        lon: Number
      },
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

  /*schema.methods.dudify = function() {
        // add some stuff to the users name
        this.name = this.name + '-dude';
        return this.name;
    };*/

  schema.statics.CREATE = async function(branch) {
    return this.create({
      _id: branch[0],
      location: branch[1],
      address: branch[2],
      isDeleted: branch[3]
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
      let cursor, branch;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }
      try {
        while (null !== (branch = await cursor.next())) {
          if (asynch) {
            try {
              await callback(branch);
            } catch (err) {
              throw err;
            }
          } else {
            callback(branch);
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

  schema.statics.UPDATE = async function(branch) {
    const filter = { _id: branch._id };
    const update = {
      location: branch.location,
      address: branch.address,
      isDeleted: branch.isDeleted
    };

    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.statics.DELETE = async function(branch) {
    const filter = { _id: branch._id };
    const update = { isDeleted: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  // the schema is useless so far
  // we need to create a model using it
  // db.model('Branch', schema, 'Branch'); // (model, schema, collection)
  db.model("Branch", schema); // if model name === collection name
  debug("Branch model created");
};
