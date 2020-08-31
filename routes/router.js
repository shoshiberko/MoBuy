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

passport.use("User", User.createStrategy());

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
      id: "12342378",
      firstName: "Dana",
      lastName: "Lev",
      emailAddress: "d@gmail.com",

      password: "12344321",
      userType: "Client",
      image: "",
      savedItemsList: [], //({ productId: Number, color: String }),
      cartItemsList: [], //({ productId: Number, count: Number, color: String }),
      orderList: [], //({orderId})
      address: "",
      isDeleted: "false"
    }
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
      isDeleted: false
    }
  ];

  /*users_.forEach(element =>
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
      false
    ])
  );
  products_.forEach(element =>
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

  User.register(
    {
      _id: "12388888",
      firstName: "Shosh",
      lastName: "Bar",
      emailAddress: "s@gmail.com",
      userType: "Client",
      image: "",
      savedItemsList: [], //({ productId: Number, color: String }),
      cartItemsList: [], //({ productId: Number, count: Number, color: String }),
      orderList: [], //({orderId})
      address: "",
      isDeleted: "false"
    },
    "12344321",
    function(err, user) {
      if (err) {
        console.log(err);
      }
    }
  );

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
  // initDB();
  console.log(req);
  passport.authenticate(["User"], (err, user, info) => {
    if (err) {
      console.log("1 " + err);
      res.send(404);
      //return next(err);
    } else if (!user) {
      console.log("2 " + user);
      res.send(404);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          console.log("3 " + err);
          //return next(err);
          res.send(404);
        } else res.send(200);
      });
    }
  })(req, res, next);
});

router.get("/addUser", async function(req, res) {
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
        isDeleted: false
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
        false
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
            "false"
          ]
      );
    }
  } catch (err) {
    console.log(`Failure ${err}`);
  }

  res.end("OK");
});

router.get("/Products", connectEnsureLogin.ensureLoggedIn(), async function(
  req,
  res
) {
  var userName = req.query.name;
  let user = await User.find({
    userName: userName,
    isDeleted: false
  }).exec();
  let savedItemsId = user.savedItemsList;

  let products = await Product.find({ isDeleted: false }).exec();
  products.map(element => {
    if (savedItemsId.findInex(item.id) !== -1)
      return {
        id: element.id,
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
        savedItem: true
      };
    else {
      return {
        id: element.id,
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
        savedItem: false
      };
    }
  });
  res.json(products);
});

router.get("/contactSend", function(req, res) {
  res.end("Thank You!");
  //res.end();
});

router.get("/logout", connectEnsureLogin.ensureLoggedIn(), function(req, res) {
  req.session.regenerate(err => {
    // res.redirect('/');

    fs.readFile("views/logout.txt", { encoding: "utf-8" }, function(err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        // res.end();
      }
    });
  });
});

router.get("/Product", connectEnsureLogin.ensureLoggedIn(), async function(
  req,
  res
) {
  var userName = req.query.name;
  let user = await User.find({
    userName: userName,
    isDeleted: false
  }).exec();
  let savedItemsId = user.savedItemsList;

  let products = await Product.find({ isDeleted: false }).exec();
  products.map(element => {
    if (savedItemsId.findInex(item.id) !== -1)
      return {
        id: element.id,
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
        savedItem: true
      };
    else {
      return {
        id: element.id,
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
        savedItem: false
      };
    }
  });

  if (vendor !== null && vendor.length > 0) {
    res.render("flowersCatalogVendors.ejs", { flowers: flowers });
  } else {
    res.render("flowersCatalog.ejs", { flowers: flowers });
  }
});

module.exports = router;
