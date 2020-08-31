const debug = require("debug")("mongo:model");
const mongo = require("mongoose");

let db = mongo.createConnection();
(async () => {
  try {
    await db.openUri(
      "mongodb+srv://flowers4u:12344321@cluster0-deaod.mongodb.net/mobuy?retryWrites=true&w=majority"
      //"mongodb+srv://mobuy:12344321@cluster0.ngia2.mongodb.net/mobuy?retryWrites=true&w=majority"
    ); //'mongodb+srv://flowers4u:12344321@cluster0-deaod.mongodb.net/test?retryWrites=true&w=majority')//'mongodb://localhost/lab-mongo-5778');
  } catch (err) {
    debug("Error connecting to DB: " + err);
  }
})();
debug("Pending DB connection");
const passport = require("passport");
require("./user")(db);
require("./product")(db);
require("./branch")(db);
require("./order")(db);
require("./comment")(db);

module.exports = model => db.model(model);
