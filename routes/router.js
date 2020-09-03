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
      id: 206,
      name: "Galaxi S8",
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
    {
      id: 207,
      name: "Galaxi S9",
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
    {
      id: 208,
      name: "Iphone X",
      price: 500,
      imagesList: ["", "", ""], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "Apple",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
  ];

  /*users_.forEach((element) =>
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
  */
  products_.forEach((element) =>
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
      false,
    ])
  );

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

router.post("/SignIn", (req, res, next) => {
  //initDB();
  passport.authenticate(["User"], (err, user, info) => {
    if (err) {
      console.log("1 " + err);
      res.send(404);
      //return next(err);
    } else if (!user) {
      console.log("2 " + user);
      res.send(404);
    } else {
      req.login(user, function (err) {
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
  let products = await Product.find({ isDeleted: false }).exec();
  if (savedItemsIdsList !== undefined) {
    res.json(
      products.map((element) => {
        if (savedItemsIdsList.findIndex((item) => item === element._id) !== -1)
          return {
            id: element._id,
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
      })
    );
  }
  //res.json(products);
});

/*
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
});*/

router.post(
  "/StateSavedItem",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.findOne({
        emailAddress: req.body.emailAddress,
        isDeleted: false,
      }).exec();
      let productId = req.body.productId;

      let product = await Product.findOne({
        isDeleted: false,
        _id: productId,
      }).exec();

      let _savedItemsList = user.savedItemsList;
      if (product === undefined) {
        //product does not exist
        res.send(404);
      } else if (req.body.state === "true") {
        //need to add the product id to the user's savedItems list
        if (_savedItemsList === undefined) _savedItemsList = [];
        if (
          _savedItemsList === [] ||
          _savedItemsList.findIndex((item) => item === productId) === -1
        ) {
          _savedItemsList.push(productId);
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
        //need to remove the product id from the user's savedItems list/
        console.log("productId:", productId);
        console.log("before:", _savedItemsList);
        _savedItemsList = _savedItemsList.filter((item) => {
          return item !== productId.toString();
        });
        console.log("after:", _savedItemsList);
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
        res.send(404);
      }
    } catch (err) {
      console.log(err);
      res.send(404);
    }
  }
);

router.post("/AddItem", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  try {
    let user = await User.findOne({
      emailAddress: req.body.emailAddress,
      isDeleted: false,
    }).exec();
    let productId = req.body.productId;

    let product = await Product.findOne({
      isDeleted: false,
      _id: productId,
    }).exec();

    let _cartItemsList = user.cartItemsList;
    if (product === undefined) {
      //product does not exist
      res.send(404);
    } else {
      //need to add the product id to the user's savedItems list
      if (_cartItemsList === undefined) _cartItemsList = [];
      if (
        _cartItemsList === [] ||
        _cartItemsList.findIndex((item) => item.productId === productId) === -1
      ) {
        _cartItemsList.push({ productId: productId, count: 1 });
        await User.UPDATE({
          _id: user._id,
          savedItemsList: user.savedItemsList,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          userType: user.userType,
          image: user.image,
          cartItemsList: _cartItemsList,
          orderList: user.orderList,
          address: user.address,
          isDeleted: false,
        });
        res.send(200);
      } else res.send(404);
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

router.post("/RemoveItem", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  try {
    let user = await User.findOne({
      emailAddress: req.body.emailAddress,
      isDeleted: false,
    }).exec();
    let productId = req.body.productId;
    let product = await Product.findOne({
      isDeleted: false,
      _id: productId,
    }).exec();

    let _cartItemsList = user.cartItemsList;
    console.log("_cartItemsList", _cartItemsList);
    if (product === undefined) {
      //product does not exist
      res.send(404);
    } else {
      //need to add the product id to the user's savedItems list
      if (_cartItemsList === undefined) res.send(404);

      _cartItemsList = _cartItemsList.filter((item) => {
        return item !== productId;
      });
      await User.UPDATE({
        _id: user._id,
        savedItemsList: user.savedItemsList,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        userType: user.userType,
        image: user.image,
        cartItemsList: _cartItemsList,
        orderList: user.orderList,
        address: user.address,
        isDeleted: false,
      });
      res.send(200);
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

router.post(
  "/IncreaseOrDecreaseItem",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.findOne({
        emailAddress: req.body.emailAddress,
        isDeleted: false,
      }).exec();
      let productId = req.body.productId;
      let incOrDec = req.body.reqType;
      let product = await Product.findOne({
        isDeleted: false,
        _id: productId,
      }).exec();

      let _cartItemsList = user.cartItemsList;
      if (product === undefined) {
        //product does not exist
        res.send(404);
      } else {
        //need to add the product id to the user's savedItems list
        if (_cartItemsList === undefined) res.send(404);
        prodIndex = _cartItemsList.findIndex(
          (item) => item.productId === productId
        );
        if (prodIndex !== -1) {
          if (incOrDec === "increase") _cartItemsList[prodIndex].count++;
          //decrease
          else _cartItemsList[prodIndex].count--;
          await User.UPDATE({
            _id: user._id,
            savedItemsList: user.savedItemsList,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            userType: user.userType,
            image: user.image,
            cartItemsList: _cartItemsList,
            orderList: user.orderList,
            address: user.address,
            isDeleted: false,
          });
          res.send(200);
        } else res.send(404);
      }
    } catch (err) {
      console.log(err);
      res.send(404);
    }
  }
);

router.post("/AddItem", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  try {
    let user = await User.findOne({
      emailAddress: req.body.emailAddress,
      isDeleted: false,
    }).exec();
    let productId = req.body.productId;

    let product = await Product.findOne({
      isDeleted: false,
      _id: productId,
    }).exec();

    let _cartItemsList = user.cartItemsList;
    if (product === undefined) {
      //product does not exist
      res.send(404);
    } else {
      //need to add the product id to the user's savedItems list
      if (_cartItemsList === undefined) _cartItemsList = [];
      if (
        _cartItemsList === [] ||
        _cartItemsList.findIndex((item) => item.productId === productId) === -1
      ) {
        _cartItemsList.push({ productId: productId, count: 1 });
        await User.UPDATE({
          _id: user._id,
          savedItemsList: user.savedItemsList,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          userType: user.userType,
          image: user.image,
          cartItemsList: _cartItemsList,
          orderList: user.orderList,
          address: user.address,
          isDeleted: false,
        });
        res.send(200);
      } else res.send(404);
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

router.get(
  "/GetProductItem",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    let product = await Product.findOne({
      _id: req.query.Id,
      isDeleted: false,
    }).exec();
    res.json(product);
  }
);


router.get(
  "/LogOut",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
   // sessionStorage.setItem("userEmail","");
   req.logout();
   res.redirect("/SignIn");
    }
);

module.exports = router;
