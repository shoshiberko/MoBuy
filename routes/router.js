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
const { map } = require("../app");

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

router.get("/GetMyOrders", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  var userEmail = req.query.userEmail;

  let orders = await Order.find({
    userEmail: userEmail,
    isDeleted: false,
  }).exec();

  res.json(
    orders.map((order) => {
      return {
        id: order._id,
        cardNumber4LastDigits: order.paymentDetails.cardNumber4LastDigits,
        cardType: order.paymentDetails.cardType,
        totalPrice: order.paymentDetails.totalPrice,
        date: order.created_at,
        productsList: order.productsList,
        address: order.address,
      };
    })
  );
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
        _savedItemsList = _savedItemsList.filter((item) => {
          return item !== productId.toString();
        });
        //  console.log("after:", _savedItemsList);
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

/*
var data = {
  emailAddress: sessionStorage.getItem("userEmail"),
  productsList: cartItems.map((item) => {
    return {
      id: item.id,
      color: "0xffffff",
      count: item.quantity,
      itemPrice: item.itemPrice,
    };
  }),
  addresses: addresses.join(","),
  payments: {
    cardType: payments[0].detail,
    cardHolder: payments[1].detail,
    cardNumber4LastDigits: cardNumber4LastDigits,
    totalPrice: total,
  },
};*/
//PlaceOrder
router.post("/PlaceOrder", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  try {
    //console.log("PlaceOrder");
    let emailAddress = req.body.emailAddress;
    let user = await User.findOne({
      emailAddress: emailAddress,
      isDeleted: false,
    }).exec();
    // console.log("user", user);
    let orderProductsList = req.body.productsList;
    // console.log("orderProductsList", orderProductsList);
    let address = req.body.addresses;
    //console.log("address", address);
    let payments = req.body.payments;
    //console.log("payments", payments);
    //calculate the order id
    let orders = await Order.find().exec();
    let orderId = 100; //first order id is 100, the second will be 101...
    if (orders !== undefined) {
      orderId = parseInt(orders[orders.length - 1]._id) + 1;
      // console.log("orderId1", orderId);
    }
    //console.log("orderId2", orderId);
    //create the order in the DB
    await Order.CREATE([
      orderId,
      emailAddress,
      orderProductsList,
      address,
      payments,
      false,
    ]);
    res.json(orderId); //need to send the order id to the client
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

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

router.get("/LogOut", connectEnsureLogin.ensureLoggedIn(), async function (
  req,
  res
) {
  // sessionStorage.setItem("userEmail","");
  req.logout();
  res.redirect("/SignIn");
});

router.get("/LogOut", async function (req, res) {
  // sessionStorage.setItem("userEmail","");
  req.logout();
  res.redirect("/SignIn");
});

router.get("/GetAllProductItem", async function (req, res) {
  // sessionStorage.setItem("userEmail","");
  let products = await Product.find({});
  res.json(products);
});

router.post(
  "/AddCommentToProduct",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.findOne({
        emailAddress: req.body.comment.emailAddress,
        isDeleted: false,
      }).exec();

      console.log(req.body);
      let productId = req.body.comment.productId;
      console.log(productId);
      let product = await Product.findOne({
        isDeleted: false,
        _id: productId,
      }).exec();
      console.log(product);
      let comments = await Comment.find({}).exec();

      if (user.image === "") {
        let str = user.firstName.replace(/\s/g, "");
        await Comment.CREATE([
          comments.length,
          user.name + " " + user.lastName,
          user.emailAddress,
          str.substring(1, 1),
          req.body.comment.rating,
          "",
          req.body.comment.time,
          req.body.comment.text,
          false,
        ]);
      } else {
        await Comment.CREATE([
          comments.length,
          user.name + " " + user.lastName,
          user.emailAddress,
          user.image,
          req.body.comment.rating,
          "",
          req.body.comment.time,
          req.body.comment.text,
          false,
        ]);
      }

      let _commentsList = product.commentsList;
      //need to add the product id to the user's savedItems lis
      if (_commentsList === undefined) _commentsList = [];
      if (
        _commentsList === [] ||
        _commentsList.findIndex((item) => item === comments.length) === -1
      ) {
        _commentsList.push(comments.length);
        await Product.UPDATE({
          _id: product._id,
          name: product.name,
          price: product.price,
          imagesList: product.imageList, //Str
          rating: product.rating,
          numOfRatings: product.numOfRatings,
          moreDetails: product.moreDetails, //st
          colorsList: product.colorsList, // st
          productType: product.productType,
          company: product.company,
          commentsList: _commentsList, //a
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

router.post("/SignUp", async function (req, res) {
  let usersList = await User.find({});
  User.register(
    {
      _id: usersList.length.toString(),
      firstName: req.body.fName,
      lastName: req.body.lName,
      emailAddress: req.body.emailAddress,
      userType: "Client",
      image: "",
      savedItemsList: [],
      cartItemsList: [],
      orderList: [],
      address: "",
      isDeleted: false,
    },
    DecryptPassword(req.body.password),
    function (err, user) {
      if (err) {
        console.log(err);
      }
    }
  );
  res.send(200);
});

module.exports = router;
