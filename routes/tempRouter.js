const express = require("express");
const product = require("../model/product");
const router = express.Router();
const User = require("../model")("User");
const Branch = require("../model")("Branch");
const Comment = require("../model")("Comment");
const Order = require("../model")("Order");
const Product = require("../model")("Product");
const debug = require("debug")("lab7:login");
const connectEnsureLogin = require("connect-ensure-login");

/* PASSPORT LOCAL AUTHENTICATION */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//passport.use("User", User.createStrategy());

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailAddress",
      passwordField: "password",
    },
    (emailAddress, password, done) => {
      User.findOne({ emailAddress: emailAddress })
        .then((user) => {
          console.log(
            "shoshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ",
            user
          );
          if (!user || !User.validatePassword(user, password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);

function SessionConstructor(userId, userType, details) {
  this.userId = userId;
  this.userType = userType;
  this.details = details;
}

//module.exports = function(passport) {

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/*passport.serializeUser(function(userObject, done) {
  // userObject could be a Model1

  let sessionConstructor = new SessionConstructor(
    userObject.id,
    userObject.userType,
    ""
  );
  done(null, sessionConstructor);
});

passport.deserializeUser(function(sessionConstructor, done) {
  User.findOne(
    {
      _id: sessionConstructor.userId
    },
    "-localStrategy.password",
    function(err, user) {
      // When using string syntax, prefixing a path with - will flag that path as excluded.
      done(err, user);
    }
  );
});*/

function initDB() {
  var users_ = [
    {
      id: "9934678",
      firstName: "Dana",
      lastName: "Lev",
      emailAddress: "i@gmail.com",

      password: "12344321",
      userType: "Client",
      image: "",
      savedItemsList: [], //({ productId: Number, color: String }),
      cartItemsList: [], //({ productId: Number, count: Number, color: String }),
      orderList: [], //({orderId})
      address: "",
      isDeleted: "false",
    },
  ];

  var products_ = [
    {
      id: 12345,
      name: "Galaxi S7",
      price: 500,
      imagesList: ["", "", ""], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "SAMSUNG",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
  ];

  users_.forEach((element) =>
    User.CREATE([
      element.id,
      element.firstName,
      element.lastName,
      element.emailAddress,
      element.password,
      element.userType,
      element.image,
      element.savedItemsList,
      element.cartItemsList,
      element.orderList,
      element.address,
      false,
    ])
  );
  /*products_.forEach(element =>
    Product.CREATE([
      element.id,
      element.name,
      element.price,
      element.imagesList,
      element.rating,
      element.numOfRatings,
      element.moreDetails,
      element.colorsList,
      element.productType,
      element.company,
      element.commentsList,
      false
    ])
  );*/

  /*User.register(
    {
      _id: "123",
      firstName: "Efrat",
      lastName: "Bar",
      emailAddress: "a@gmail.com",
      userType: "Client",
      image: "",
      savedItemsList: [], //({ productId: Number, color: String }),
      cartItemsList: [], //({ productId: Number, count: Number, color: String }),
      orderList: [], //({orderId})
      address: "",
      isDeleted: "false"
    },
    "123",
    function(err, user) {
      if (err) {
        console.log(err);
      }
    }
  );*/

  console.log("initDB");
}

async function loadUsers(userName) {
  usersLst = [];
  try {
    let _users = await User.find({ isDeleted: false })
      //.where("userName")
      //.ne(userName)
      .exec();
  } catch (err) {
    console.log(`Failure ${err}`);
  }
}

router.post("/SignIn", (req, res, next) => {
  //initDB();
  // console.log(req);
  passport.authenticate("local" /*["User"]*/, (err, user, info) => {
    if (err) {
      console.log("1 " + err);
      res.send(404);
      //return next(err);
    } else if (!user) {
      console.log("2 " + user);
      res.send(404);
    } else {
      req.logIn(user, function (err) {
        if (err) {
          console.log("3 " + err);
          //return next(err);
          res.send(404);
        } else res.send(200);
      });
    }
  })(req, res, next);
});

router.post(
  "/StateSavedItem",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.find({
        userEmail: req.body.emailAddress,
        isDeleted: false,
      }).exec();
      //initDB();
      console.log("user is:", user);

      let productId = req.body.productId;

      // console.log("productId is", productId);
      let product = await Product.find({
        isDeleted: false,
        _id: productId,
      }).exec();
      await Product.UPDATE({
        _id: 12345,
        name: product.name,
        price: product.price,
        imageList: product.imagesList,
        rating: 1,
        numOfRatings: product.numOfRatings,
        moreDetails: product.moreDetails,
        colorsList: product.colorsList,
        productType: product.productType,
        company: product.company,
        commentsList: product.commentsList,
        isDeleted: false,
      });
      let _savedItemsList = user.savedItemsList;
      if (product == undefined)
        //product does not exist
        res.send(404);
      else if (req.body.state) {
        //need to add the product id to the user's savedItems list
        if (_savedItemsList === undefined) _savedItemsList = [];
        if (
          _savedItemsList === [] ||
          _savedItemsList.findIndex((item) => item === productId) === -1
        ) {
          _savedItemsList.push(productId);
          // User.UPDATE(user);
          console.log("userId:", user._id);
          await User.UPDATE({
            _id: user._id,
            savedItemsList: _savedItemsList,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            password: user.password,
            userType: user.userType,
            image: user.image,

            cartItemsList: user.cartItemsList,
            orderList: user.orderList,
            address: user.address,
            isDeleted: false,
          });
          res.send(200);
        } else res.send(404);
      } else if (_savedItemsList !== undefined) {
        //need to remove the product id from the user's savedItems list/
        _savedItemsList = _savedItemsList.filter((item) => {
          item !== productId;
        });
        //User.UPDATE(user);
        await User.UPDATE({
          _id: user._id,
          savedItemsList: _savedItemsList,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          password: user.password,
          userType: user.userType,
          image: user.image,

          cartItemsList: user.cartItemsList,
          orderList: user.orderList,
          address: user.address,
          isDeleted: false,
        });
        res.send(200);
      } else res.send(404);
    } catch (err) {
      console.log(err);
      res.send(404);
    }
  }
);

router.get("/addUser", async function (req, res) {
  //NEED TO TAKE CARE THIS FUNCTION
  let addedId = req.query.id;
  let addedFirstName = req.query.firstName;
  let addedLastName = req.query.lastName;
  let addedUserName = req.query.userName;
  let addedGender = req.query.gender;
  let addedRole = req.query.role;
  let addedPassword = req.query.password;
  let addedNumOfBranch = req.query.numOfBranch;
  let addedSupply = req.query.supply;

  try {
    let user = await User.find({ _id: addedId }).exec();
    if (manager !== null && manager.length > 0) {
      //if this is a manager and the new role is manager-update
      User.UPDATE({
        firstName: addedFirstName,
        lastName: addedLastName,
        _id: addedId,
        userName: addedUserName,
        gender: addedGender,
        password: addedPassword,
        isDeleted: false,
      });
    } //if this is not a manager - need to add it to managers and delete from old place if there is list with it
    else {
      await User.CREATE([
        addedId,
        addedFirstName,
        addedLastName,
        addedUserName,
        addedPassword,
        addedGender,
        false,
      ]);
      console.log(
        "User created:" +
          [
            addedId,
            addedFirstName,
            addedLastName,
            addedUserName,
            addedPassword,
            addedGender,
            "false",
          ]
      );
    }
  } catch (err) {
    console.log(`Failure ${err}`);
  }

  res.end("OK");
});

router.get("/Products", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  var userEmail = req.query.userEmail;
  let user = await User.find({
    userEmail: userEmail,
    isDeleted: false,
  }).exec();

  let savedItemsIdsList = user.savedItemsList;
  let products = await Product.find({ isDeleted: false }).exec();
  if (savedItemsIdsList !== undefined) {
    products.map((element) => {
      if (savedItemsIdsList.findInex(item.id) !== -1)
        return {
          _id: element.id,
          name: element.name,
          price: element.price,
          imagesList: element.imagesList,
          rating: element.rating,
          numOfRatings: element.numOfRatings,
          moreDetails: element.moreDetails,
          colorsList: element.colorsList,
          productType: element.productType,
          company: element.company,
          commentsList: element.commentsList,
          savedItem: true,
        };
      else {
        return {
          _id: element.id,
          name: element.name,
          price: element.price,
          imagesList: element.imagesList,
          rating: element.rating,
          numOfRatings: element.numOfRatings,
          moreDetails: element.moreDetails,
          colorsList: element.colorsList,
          productType: element.productType,
          company: element.company,
          commentsList: element.commentsList,
          savedItem: false,
        };
      }
    });
  }
  res.json(products);
});

router.get("/contactSend", function (req, res) {
  res.end("Thank You!");
  //res.end();
});

router.get("/logout", connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  req.session.regenerate((err) => {
    // res.redirect('/');

    fs.readFile("views/logout.txt", { encoding: "utf-8" }, function (
      err,
      data
    ) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        // res.end();
      }
    });
  });
});

router.get("/Product", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  var userName = req.query.name;
  let user = await User.find({
    userName: userName,
    isDeleted: false,
  }).exec();
  let savedItemsIdsList = user.savedItemsList;

  let products = await Product.find({ isDeleted: false }).exec();
});

module.exports = router;
