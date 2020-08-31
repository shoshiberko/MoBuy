const debug = require("debug")("mongo:mongo");
const mongo = require("mongoose");
let db = mongo.createConnection(
  "mongodb+srv://flowers4u:12344321@cluster0-deaod.mongodb.net/mobuy?retryWrites=true&w=majority"
  //"mongodb+srv://mobuy:12344321@cluster0.ngia2.mongodb.net/mobuy?retryWrites=true&w=majority"
); //'mongodb://localhost/myfirstdatabase');
db.on("open", function() {
  debug("On open DB");
});
db.on("error", function() {
  debug("Error connecting to DB");
});
db.on("connecting", () => {
  debug("On connecting to MongoDB: ");
});
db.on("connected", () => {
  debug("On connected to MongoDB: ");
});
db.on("disconnecting", () => {
  debug("On disconnecting to MongoDB: ");
});
db.on("disconnected", () => {
  debug("On disconnected to MongoDB: ");
});
db.on("disconnecting", () => {
  debug("On disconnecting to MongoDB: ");
});
db.on("reconnected", () => {
  debug("On reconnected to MongoDB: ");
});
db.on("error", err => {
  debug("On error to MongoDB: " + err);
});
db.on("close", () => {
  debug("On MongoDB close: ");
});
console.log("Pending DB connection");
db.then(async db1 => {
  debug("Creating model");
  let Test = db.model("Test", new mongo.Schema({}), "Empties");
  debug("Creating a document");
  await Test.create({});
  debug("Query");
  let tests = await Test.find({}).exec();
  debug(tests);
  debug(await Test.findOne({}).exec());
  let close = db1.close();
  debug("Closing");
  await close;
  debug("Closed");
});
