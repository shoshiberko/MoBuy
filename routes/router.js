const express = require("express");
const product = require("../model/product");
const router = express.Router();
const User = require("../model")("User");
const Authenticate = require("../model")("Authenticate");
const Branch = require("../model")("Branch");
const Comment = require("../model")("Comment");
const Order = require("../model")("Order");
const Product = require("../model")("Product");
const debug = require("debug")("lab7:login");
const connectEnsureLogin = require("connect-ensure-login");

/* PASSPORT LOCAL AUTHENTICATION */
const passport = require("passport");

passport.use("Authenticate", Authenticate.createStrategy());

function SessionConstructor(userId, userType, details) {
  this.userId = userId;
  this.userType = userType;
  this.details = details;
}

//module.exports = function(passport) {

passport.serializeUser(Authenticate.serializeUser());
passport.deserializeUser(Authenticate.deserializeUser());
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
      id: "12388888",
      firstName: "Dana",
      lastName: "Lev",
      emailAddress: "s@gmail.com",
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
      element.userType,
      element.image,
      element.savedItemsList,
      element.cartItemsList,
      element.orderList,
      element.address,
      false,
    ])
  );
  /* products_.forEach(element =>
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

  Authenticate.register(
    {
      _id: "12388888",
      emailAddress: "s@gmail.com",
      isDeleted: "false",
    },
    "123",
    function (err, user) {
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
  //initDB();
  console.log(req);
  passport.authenticate(["Authenticate"], (err, user, info) => {
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

router.get("/Products", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  var userEmail = req.query.userEmail;
  let user = await User.findOne({
    emailAddress: userEmail,
    isDeleted: false,
  }).exec();

  let savedItemsIdsList = user.savedItemsList;
  console.log("savedItemsIdsList", savedItemsIdsList);
  let products = await Product.find({ isDeleted: false }).exec();
  console.log(products);
  if (savedItemsIdsList !== undefined) {
    res.json(
      products.map((element) => {
        if (savedItemsIdsList.findIndex((item) => item === element._id) !== -1)
          return {
            _id: element._id,
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
      })
    );
  }
  //res.json(products);
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
  let savedItemsId = user.savedItemsList;

  let products = await Product.find({ isDeleted: false }).exec();
  products.map((element) => {
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
        savedItem: true,
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
        savedItem: false,
      };
    }
  });

  if (vendor !== null && vendor.length > 0) {
    res.render("flowersCatalogVendors.ejs", { flowers: flowers });
  } else {
    res.render("flowersCatalog.ejs", { flowers: flowers });
  }
});

router.post(
  "/StateSavedItem",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.findOne({
        emailAddress: req.body.emailAddress,
        isDeleted: false,
      }).exec();
      //initDB();
      console.log("user is:", user);
      //console.log("userId is:", user.id);
      let productId = req.body.productId;

      let product = await Product.findOne({
        isDeleted: false,
        _id: productId,
      }).exec();

      console.log("product is", product);
      /* await Product.UPDATE({
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
      });*/
      let _savedItemsList = user.savedItemsList;
      console.log("_savedItemsList is", _savedItemsList);
      console.log("state", req.body.state);
      if (product === undefined) {
        console.log("111");
        //product does not exist
        res.send(404);
      } else if (req.body.state === "true") {
        console.log("222");
        //need to add the product id to the user's savedItems list
        if (_savedItemsList === undefined) _savedItemsList = [];
        if (
          _savedItemsList === [] ||
          _savedItemsList.findIndex((item) => item === productId) === -1
        ) {
          _savedItemsList.push(productId);
          console.log("_savedItemsList After is", _savedItemsList);
          // User.UPDATE(user);
          console.log("userId:", user._id);
          await User.UPDATE({
            _id: user._id,
            savedItemsList: _savedItemsList,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
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
        console.log("abc");
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
          userType: user.userType,
          image: user.image,
          cartItemsList: user.cartItemsList,
          orderList: user.orderList,
          address: user.address,
          isDeleted: false,
        });
        res.send(200);
      } else {
        console.log("hgt");
        res.send(404);
      }
    } catch (err) {
      console.log("prob");
      console.log(err);
      res.send(404);
    }
  }
);

module.exports = router;
