const debug = require("debug")("mongo:model-comment");
const mongo = require("mongoose");

module.exports = db => {
  // create a schema
  let schema = new mongo.Schema(
    {
      _id: String,
      name: String, // name of the commented person (user or not)
      userEmail: String,
      rating: Number,
      color: String,
      date: Date,
      commentsData: String,
      isDeleted: Boolean,
      created_at: Date,
      updated_at: Date
    },
    { autoIndex: false }
  );

  // custom method to add string to end of name
  // you can create more important methods like name validations or formatting
  // you can also do queries and find similar users

  schema.statics.CREATE = async function(comment) {
    return this.create({
      _id: comment[0],
      name: comment[1],
      userEmail: comment[2],
      rating: comment[3],
      color: comment[4],
      date: comment[5],
      commentsData: comment[6],
      isDeleted: comment[7]
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
      let cursor, comment;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }
      try {
        while (null !== (comment = await cursor.next())) {
          if (asynch) {
            try {
              await callback(comment);
            } catch (err) {
              throw err;
            }
          } else {
            callback(comment);
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

  schema.statics.UPDATE = async function(comment) {
    const filter = { _id: comment._id };
    const update = {
      name: comment.name,
      userEmail: comment.userEmail,
      rating: comment.rating,
      color: comment.color,
      date: comment.date,
      commentsData: comment.commentsData,
      isDeleted: comment.isDeleted
    };

    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  schema.statics.DELETE = async function(comment) {
    const filter = { _id: comment._id };
    const update = { isDeleted: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await this.findOneAndUpdate(filter, update);
    await doc.save();
  };

  // the schema is useless so far
  // we need to create a model using it
  // db.model('comment', schema, 'comment'); // (model, schema, collection)
  db.model("Comment", schema); // if model name === collection name
  debug("Comment model created");
};
