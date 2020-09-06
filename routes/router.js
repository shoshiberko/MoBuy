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
      id: 210,
      name: "LG G8",
      price: 1000,
      imagesList: [
        "../../Phones/LGG8/LGG8_1.png",
        "../../Phones/LGG8/LGG8_2.png",
        "../../Phones/LGG8/LGG8_3.png",
      ], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "LG",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
    {
      id: 211,
      name: "Galaxi A70",
      price: 500,
      imagesList: [
        "../../Phones/GalaxyA70/GalaxyA70_1.png",
        "../../Phones/GalaxyA70/GalaxyA70_2.png",
        "../../Phones/GalaxyA70/GalaxyA70_3.png",
      ], //String's array
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
      id: 212,
      name: "iPhone 11 Pro",
      price: 500,
      imagesList: [
        "../../Phones/iPhone11Pro/11Pro_2.png",
        "../../Phones/iPhone11Pro/11Pro_1.png",
        "../../Phones/iPhone11Pro/11Pro_3.png",
      ], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "Apple",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
    {
      id: 213,
      name: "iPhone SE",
      price: 2000,
      imagesList: [
        "../../Phones/iPhoneSE/IphoneSE_1.png",
        "../../Phones/iPhoneSE/IphoneSE_2.png",
        "../../Phones/iPhoneSE/IphoneSE_3.png",
      ], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "Apple",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
    {
      id: 214,
      name: "Xiaomi Redmi 9",
      price: 500,
      imagesList: [
        "../../Phones/XiaomiRedmi9/Redmi9_1.png",
        "../../Phones/XiaomiRedmi9/Redmi9_2.png",
        "../../Phones/XiaomiRedmi9/Redmi9_3.png",
      ], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "Xiaomi",
      commentsList: [], //array of comments id (id-s from the comment schema)
      isDeleted: false,
    },
    {
      id: 215,
      name: "Xiaomi Redmi Note 9",
      price: 500,
      imagesList: [
        "../../Phones/XiaomiRedmiNote9/RedmiNote9_1.png",
        "../../Phones/XiaomiRedmiNote9/RedmiNote9_2.png",
        "../../Phones/XiaomiRedmiNote9/RedmiNote9_3.png",
      ], //String's array
      rating: 0,
      numOfRatings: 0,
      moreDetails: ["", "", ""],
      colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
      productType: "phone",
      company: "Xiaomi",
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

  /*User.register(
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
  );*/

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

router.get(
  "/GetCommentsList",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let product = await Product.findOne({
        _id: req.query.productId,
        isDeleted: false,
      }).exec();
      console.log(product);
      console.log(product.commentsList);
      if (
        product !== undefined &&
        product !== null &&
        product.commentsList !== undefined
      ) {
        console.log("Efrat");
        let comments = await Comment.find({}).exec();
        console.log("Ef1", comments);
        //let Gcomments=comments.filter((item)=>{return product.commentsList.findIndex((element)=>element===item._id)!==-1});
        let Gcomments = comments.filter((item) => {
          return product.commentsList.includes(item._id);
        });
        res.json(Gcomments);
        console.log("Ef", Gcomments);
      } else {
        res.json([]);
        console.log([]);
      }
    } catch (err) {
      res.send(404);
    }
  }
);

router.get(
  "/AddCommentToProduct",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    try {
      let user = await User.findOne({
        emailAddress: req.query.emailAddress,
        isDeleted: false,
      }).exec();

      let productId = req.query.productId;
      let product = await Product.findOne({
        isDeleted: false,
        _id: productId,
      }).exec();
      var rNum = 0;
      if (product.numOfRatings !== undefined && product.numOfRatings !== null)
        rNum = product.numOfRatings;
      console.log("R", rNum);
      var b = 0;
      if (
        product.rating !== null &&
        product.rating !== undefined &&
        !isNaN(product.rating)
      )
        b = product.rating;
      var newRating = (b * rNum + parseFloat(req.query.rating)) / (rNum + 1);
      console.log("newRating", newRating);
      let comments = await Comment.find({}).exec();
      var countId = 0;
      if (comments !== undefined) countId = comments.length;
      var imageComment = user.image;
      if (user.image === "" || user.image === undefined) {
        let str = user.firstName.replace(/\s/g, "");
        imageComment = str.substring(0, 1);
        await Comment.CREATE([
          countId,
          user.firstName + " " + user.lastName,
          user.emailAddress,
          str.substring(0, 1),
          req.query.rating,
          "",
          req.query.time,
          req.query.text,
          false,
        ]);
      } else {
        await Comment.CREATE([
          countId,
          user.firstName + " " + user.lastName,
          user.emailAddress,
          user.image,
          req.query.rating,
          "",
          req.query.time,
          req.query.text,
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
          imagesList: product.imagesList,
          rating: newRating,
          numOfRatings: rNum + 1,
          moreDetails: product.moreDetails,
          colorsList: product.colorsList,
          productType: product.productType,
          company: product.company,
          commentsList: _commentsList,
          isDeleted: false,
        });
        res.json({
          _id: comments.length,
          name: user.firstName + " " + user.lastName,
          userEmail: user.emailAddress,
          userImage: imageComment,
          rating: req.query.rating,
          color: "",
          date: req.query.time,
          commentsData: req.query.text,
          isDeleted: false,
        });
        0;
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
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      }
    }
  );
  res.send(200);
});

module.exports = router;
