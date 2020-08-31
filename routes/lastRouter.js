const express = require("express");
const router = express.Router();
const Manager = require("../model")("Manager");
const Employee = require("../model")("Employee");
const Client = require("../model")("Client");
const Vendor = require("../model")("Vendor");
const Flower = require("../model")("Flower");
const Branch = require("../model")("Branch");
const debug = require("debug")("lab7:login");
const connectEnsureLogin = require("connect-ensure-login");

/* PASSPORT LOCAL AUTHENTICATION */
const passport = require("passport");

passport.use("Manager", Manager.createStrategy());
passport.use("Vendor", Vendor.createStrategy());
passport.use("Employee", Employee.createStrategy());
passport.use("Client", Client.createStrategy());

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

//module.exports = function(passport) {

passport.serializeUser(function(userObject, done) {
  // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
  let userGroup = "Manager";
  let userPrototype = Object.getPrototypeOf(userObject);

  if (userPrototype === Manager.prototype) {
    userGroup = "Manager";
  } else if (userPrototype === Vendor.prototype) {
    userGroup = "Vendor";
  } else if (userPrototype === Employee.prototype) {
    userGroup = "Employee";
  } else if (userPrototype === Client.prototype) {
    userGroup = "Client";
  }

  let sessionConstructor = new SessionConstructor(userObject.id, userGroup, "");
  done(null, sessionConstructor);
});

passport.deserializeUser(function(sessionConstructor, done) {
  if (sessionConstructor.userGroup == "Manager") {
    Manager.findOne(
      {
        _id: sessionConstructor.userId
      },
      "-localStrategy.password",
      function(err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  } else if (sessionConstructor.userGroup == "Vendor") {
    Vendor.findOne(
      {
        _id: sessionConstructor.userId
      },
      "-localStrategy.password",
      function(err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  } else if (sessionConstructor.userGroup == "Employee") {
    Employee.findOne(
      {
        _id: sessionConstructor.userId
      },
      "-localStrategy.password",
      function(err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  } else if (sessionConstructor.userGroup == "Client") {
    Client.findOne(
      {
        _id: sessionConstructor.userId
      },
      "-localStrategy.password",
      function(err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  }
});

let fs = require("fs");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

var ntc = {
  init: function() {
    var color, rgb, hsl;
    for (var i = 0; i < ntc.names.length; i++) {
      color = "#" + ntc.names[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {
    color = color.toUpperCase();
    if (color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if (color.length % 3 == 0) color = "#" + color;
    if (color.length == 4)
      color =
        "#" +
        color.substr(1, 1) +
        color.substr(1, 1) +
        color.substr(2, 1) +
        color.substr(2, 1) +
        color.substr(3, 1) +
        color.substr(3, 1);

    var rgb = ntc.rgb(color);
    var r = rgb[0],
      g = rgb[1],
      b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0],
      s = hsl[1],
      l = hsl[2];
    var ndf1 = 0;
    ndf2 = 0;
    ndf = 0;
    var cl = -1,
      df = -1;

    for (var i = 0; i < ntc.names.length; i++) {
      if (color == "#" + ntc.names[i][0])
        return ["#" + ntc.names[i][0], ntc.names[i][1], true];

      ndf1 =
        Math.pow(r - ntc.names[i][2], 2) +
        Math.pow(g - ntc.names[i][3], 2) +
        Math.pow(b - ntc.names[i][4], 2);
      ndf2 =
        Math.pow(h - ntc.names[i][5], 2) +
        Math.pow(s - ntc.names[i][6], 2) +
        Math.pow(l - ntc.names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if (df < 0 || df > ndf) {
        df = ndf;
        cl = i;
      }
    }

    return cl < 0
      ? ["#000000", "Invalid Color: " + color, false]
      : ["#" + ntc.names[cl][0], ntc.names[cl][1], false];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function(color) {
    var rgb = [
      parseInt("0x" + color.substring(1, 3)) / 255,
      parseInt("0x" + color.substring(3, 5)) / 255,
      parseInt("0x" + color.substring(5, 7)) / 255
    ];
    var min, max, delta, h, s, l;
    var r = rgb[0],
      g = rgb[1],
      b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if (l > 0 && l < 1) s = delta / (l < 0.5 ? 2 * l : 2 - 2 * l);

    h = 0;
    if (delta > 0) {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += 2 + (b - r) / delta;
      if (max == b && max != r) h += 4 + (r - g) / delta;
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [
      parseInt("0x" + color.substring(1, 3)),
      parseInt("0x" + color.substring(3, 5)),
      parseInt("0x" + color.substring(5, 7))
    ];
  }
};

ntc.init();

var usersLst = [];
var employeeUsersLst = [];
var employeesLst = [];
function initDB() {
  var branches_ = [
    { num: "982", status: "true", country: "Israel", city: "Ashdod" },
    { num: "953", status: "true", country: "Israel", city: "Sderot" }
  ];
  var managers_ = [
    {
      firstName: "Dana",
      lastName: "Lev",
      userName: "d555",
      id: "12342345",
      gender: "Female",
      password: "2078258",
      isDeleted: "false"
    }
  ];
  var employees_ = [
    {
      firstName: "Dani",
      lastName: "Cohen",
      userName: "dd555",
      id: "12345629",
      gender: "Male",
      password: "12334521",
      numOfBranch: "982",
      isDeleted: "false"
    },
    {
      firstName: "Motty",
      lastName: "Dav",
      userName: "mm555",
      id: "12364759",
      gender: "Male",
      password: "12354321",
      numOfBranch: "953",
      isDeleted: "false"
    }
  ];
  var clients_ = [
    {
      firstName: "Devora",
      lastName: "Roz",
      userName: "r555",
      id: "11789954",
      gender: "Female",
      password: "12345566",
      isDeleted: "false"
    },
    {
      firstName: "Ortal",
      lastName: "Danino",
      userName: "ddd555",
      id: "56472899",
      gender: "Female",
      password: "12312334",
      isDeleted: "false"
    }
  ];
  var vendors_ = [
    {
      gender: "Male",
      firstName: "Moshe",
      lastName: "Barak",
      supply: "Roses",
      isDeleted: "false",
      id: "78977954",
      password: "5648",
      userName: "moshe10"
    },
    {
      gender: "Male",
      firstName: "Moshe",
      lastName: "Perezt",
      supply: "Narcissus",
      isDeleted: "false",
      id: "856666",
      password: "5648",
      userName: "moshe20"
    },
    {
      firstName: "Shalom",
      lastName: "Aleyhem",
      supply: "Anemones",
      isDeleted: "false",
      id: "256899",
      password: "12548shalom",
      userName: "shalom123"
    }
  ];
  var flowers_ = [
    {
      name: "Kalanit",
      color: "Red",
      imageUrl: "Kalanit.jpg",
      price: "30",
      desc: ""
    },
    {
      name: "Inbal",
      color: "Purple",
      imageUrl: "Inbal.jpg",
      price: "25",
      desc: ""
    },
    {
      name: "Dahila",
      color: "Pink",
      imageUrl: "Dahila.png",
      price: "100",
      desc: ""
    }
  ];
  branches_.forEach(element =>
    Branch.CREATE([
      element.num,
      element.active,
      element.country,
      element.city,
      false
    ])
  );
  managers_.forEach(element =>
    Manager.CREATE([
      element.id,
      element.firstName,
      element.lastName,
      element.userName,
      element.password,
      element.gender,
      false
    ])
  );
  employees_.forEach(element =>
    Employee.CREATE([
      element.id,
      element.firstName,
      element.lastName,
      element.userName,
      element.password,
      element.gender,
      false,
      element.numOfBranch
    ])
  );
  clients_.forEach(element =>
    Client.CREATE([
      element.id,
      element.firstName,
      element.lastName,
      element.userName,
      element.password,
      element.gender,
      false
    ])
  );
  vendors_.forEach(element =>
    Vendor.CREATE([
      element.id,
      element.firstName,
      element.lastName,
      element.userName,
      element.password,
      false,
      element.supply
    ])
  );
  flowers_.forEach(element =>
    Flower.CREATE([
      element.name,
      element.color,
      element.imageUrl,
      element.price,
      element.desc,
      false
    ])
  );
}
async function loadUsers(userName) {
  usersLst = [];
  try {
    let employees = await Employee.find({ isDeleted: false })
      .where("userName")
      .ne(userName)
      .exec();
    employees.forEach(element =>
      usersLst.push({
        firstName: element.firstName,
        lastName: element.lastName,
        id: element._id,
        userName: element.userName,
        gender: element.gender,
        Role: "Employee",
        numOfBranch: element.numOfBranch,
        supply: element.supply,
        password: element.password
      })
    );
    let managers = await Manager.find({ isDeleted: false })
      .where("userName")
      .ne(userName)
      .exec();
    managers.forEach(element =>
      usersLst.push({
        firstName: element.firstName,
        lastName: element.lastName,
        id: element._id,
        userName: element.userName,
        gender: element.gender,
        Role: "Manager",
        numOfBranch: element.numOfBranch,
        supply: element.supply,
        password: element.password
      })
    );
    let clients = await Client.find({ isDeleted: false })
      .where("userName")
      .ne(userName)
      .exec();
    clients.forEach(element =>
      usersLst.push({
        firstName: element.firstName,
        lastName: element.lastName,
        id: element._id,
        userName: element.userName,
        gender: element.gender,
        Role: "Client",
        numOfBranch: element.numOfBranch,
        supply: element.supply,
        password: element.password
      })
    );
    let vendors = await Vendor.find({ isDeleted: false })
      .where("userName")
      .ne(userName)
      .exec();
    vendors.forEach(element =>
      usersLst.push({
        firstName: element.firstName,
        lastName: element.lastName,
        id: element._id,
        userName: element.userName,
        gender: element.gender,
        Role: "Vendor",
        numOfBranch: element.numOfBranch,
        supply: element.supply,
        password: element.password
      })
    );
  } catch (err) {
    console.log(`Failure ${err}`);
  }
  /*employees.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>usersLst.push({firstName: element.firstName,lastName: element.lastName,
                                         id: element.id, userName:element.userName,
                                         gender: element.gender, Role: 'Employee',
                                         numOfBranch:element.numOfBranch,
                                         supply: element.supply,
										 password: element.password
                                         }));
	
	
	
managers.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>usersLst.push({firstName: element.firstName,lastName: element.lastName,
                                         id: element.id, userName:element.userName,
                                         gender: element.gender, Role:'Manager',
                                         numOfBranch:element.numOfBranch,
                                         supply: element.supply,
										 password: element.password
                                         }));
clients.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>usersLst.push({firstName: element.firstName,lastName: element.lastName,
                                         id: element.id, userName:element.userName,
                                         gender: element.gender, Role:'Client',
                                         numOfBranch:element.numOfBranch,
                                         supply: element.supply,
										 password: element.password
                                         }));
vendors.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>usersLst.push({firstName: element.firstName,lastName: element.lastName,
                                         id: element.id, userName:element.userName,
                                         gender: element.gender, Role:'Vendor',
                                         numOfBranch:element.numOfBranch,
                                         supply: element.supply,
										 password: element.password
                                         }));*/
}

async function employeeLoadUsers(userName) {
  employeeUsersLst = [];
  employeesLst = [];
  /*employees.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>employeesLst.push({firstName: element.firstName,lastName: element.lastName,
											 id: element.id, userName:element.userName,
											 gender: element.gender, Role: 'Employee',
											 numOfBranch:element.numOfBranch,
											 supply: element.supply,
											 password: element.password
											 }));
	clients.filter(element =>((element.isDeleted==='false')&&(element.userName!==userName))).forEach(element =>employeeUsersLst.push({firstName: element.firstName,lastName: element.lastName,
											 id: element.id, userName:element.userName,
											 gender: element.gender, Role:'Client',
											 numOfBranch:element.numOfBranch,
											 supply: element.supply,
											 password: element.password
											 }));*/

  let employees = await Employee.find({ isDeleted: false })
    .where("userName")
    .ne(userName)
    .exec();
  employees.forEach(element =>
    employeesLst.push({
      firstName: element.firstName,
      lastName: element.lastName,
      id: element._id,
      userName: element.userName,
      gender: element.gender,
      Role: "Client",
      numOfBranch: element.numOfBranch,
      supply: element.supply,
      password: element.password
    })
  );
  let clients = await Client.find({ isDeleted: false })
    .where("userName")
    .ne(userName)
    .exec();
  clients.forEach(element =>
    employeeUsersLst.push({
      firstName: element.firstName,
      lastName: element.lastName,
      id: element._id,
      userName: element.userName,
      gender: element.gender,
      Role: "Client",
      numOfBranch: element.numOfBranch,
      supply: element.supply,
      password: element.password
    })
  );
}

async function checkUser(userName, pass) {
  try {
    let employee = await Employee.find({
      userName: userName,
      password: pass
    }).exec();
    if (employee !== null && employee.length > 0) {
      return true;
    }
    let manager = await Manager.find({
      userName: userName,
      password: pass
    }).exec();
    if (manager !== null && manager.length > 0) {
      return true;
    }
    let client = await Client.find({
      userName: userName,
      password: pass
    }).exec();
    if (client !== null && client.length > 0) {
      return true;
    }
    let vendor = await Vendor.find({
      userName: userName,
      password: pass
    }).exec();
    if (vendor !== null && vendor.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(`Failure ${err}`);
  }

  /*		  
	return(employees.findIndex(element=>element.userName===userName&&element.password===pass)!= -1
	   ||managers.findIndex(element=>element.userName===userName&&element.password===pass)!= -1
	   ||clients.findIndex(element=>element.userName===userName&&element.password===pass)!= -1);*/
}

router.post("/userLogin", (req, res, next) => {
  passport.authenticate(
    ["Manager", "Vendor", "Employee", "Client"],
    (err, user, info) => {
      if (err) {
        console.log("1 " + err);
        res.json("DOES NOT EXIST");
        //return next(err);
      } else if (!user) {
        console.log("2 " + user);
        res.json("DOES NOT EXIST");
      } else {
        req.logIn(user, function(err) {
          if (err) {
            console.log("3 " + err);
            //return next(err);
            res.json("DOES NOT EXIST");
          } else res.json("OK");
        });
      }
    }
  )(req, res, next);
  /*if( await checkUser(req.body.name,req.body.password))
	{
		res.json("OK");
	}
	else
		res.json("DOES NOT EXIST");*/
});

router.post("/getUserType", connectEnsureLogin.ensureLoggedIn(), async function(
  req,
  res
) {
  let userName = req.body.userName;
  //let pass= req.body.password;
  try {
    let employee = await Employee.find({
      userName: userName /*, password: pass*/
    }).exec();
    if (employee !== null && employee.length > 0) res.json("employee");
    else {
      let manager = await Manager.find({
        userName: userName /*, password: pass*/
      }).exec();
      if (manager !== null && manager.length > 0) res.json("manager");
      else {
        let client = await Client.find({
          userName: userName /*, password: pass*/
        }).exec();
        if (client !== null && client.length > 0) res.json("client");
        else {
          let vendor = await Vendor.find({
            userName: userName /*, password: pass*/
          }).exec();
          if (vendor !== null && vendor.length > 0) res.json("vendor");
          else res.json("badRequest"); //else
        }
      }
    }
  } catch (err) {
    console.log(`Failure ${err}`);
    res.json("badRequest");
  }
});

router.get("/deleteUser", connectEnsureLogin.ensureLoggedIn(), async function(
  req,
  res
) {
  let deletedId = req.query.id;
  //console.log(deletedId);
  if (deletedId !== undefined) {
    try {
      let employee = await Employee.find({ _id: deletedId }).exec();
      if (employee !== null && employee.length > 0) {
        console.log(employee);
        Employee.DELETE(employee[0]);
      }
      let manager = await Manager.find({ _id: deletedId }).exec();
      if (manager !== null && manager.length > 0) {
        console.log(manager);
        Manager.DELETE(manager[0]);
      }
      let client = await Client.find({ _id: deletedId }).exec();
      if (client !== null && client.length > 0) {
        console.log(client);
        Client.DELETE(client[0]);
      }
      let vendor = await Vendor.find({ _id: deletedId }).exec();
      if (vendor !== null && vendor.length > 0) {
        console.log(vendor);
        Vendor.DELETE(vendor[0]);
      }
      res.end("OK");
    } catch (err) {
      console.log(`Failure ${err}`);
      res.end("ERROR");
    }
  } else res.end("ERROR");
});

router.get(
  "/deleteUserToEmployee",
  connectEnsureLogin.ensureLoggedIn(),
  async function(req, res) {
    let deletedId = req.query.id;
    if (deletedId !== undefined) {
      try {
        let client = await Client.find({ _id: deletedId }).exec();
        if (client !== null && client.length > 0) Client.DELETE(client[0]);
        res.end("OK");
      } catch (err) {
        console.log(`Failure ${err}`);
        res.end("ERROR");
      }
    } else res.end("ERROR");
  }
);

router.get("/addUser", async function(req, res) {
  let addedId = req.query.id;
  let addedFirstName = req.query.firstName;
  let addedLastName = req.query.lastName;
  let addedUserName = req.query.userName;
  let addedGender = req.query.gender;
  let addedRole = req.query.role;
  let addedPassword = req.query.password;
  let addedNumOfBranch = req.query.numOfBranch;
  let addedSupply = req.query.supply;

  /////
  /*var lastRole;
		if(managers.findIndex(element=>element.id===addedId)!=-1)
		{
			lastRole="Manager";
		}
		else if(employees.findIndex(element=>element.id===addedId)!=-1)
		{
			lastRole="Employee";
		}
		else if(clients.findIndex(element=>element.id===addedId)!=-1)
		{
			lastRole="Client";
		}
		else if(vendors.findIndex(element=>element.id===addedId)!=-1)
		{	
			lastRole="Vendor";
		}
		else
			lastRole="New";*/

  switch (addedRole) {
    case "Manager":
      /*try {
				 let manager = [addedId, addedFirstName,addedLastName, addedUserName, addedPassword, addedGender,'false'];
				await Manager.CREATE(manager);
				console.log('Manager created:' + manager);
			} catch(err) { throw err; }*/
      try {
        let manager = await Manager.find({ _id: addedId }).exec();
        if (manager !== null && manager.length > 0) {
          //if this is a manager and the new role is manager-update
          Manager.UPDATE({
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
          await Manager.CREATE([
            addedId,
            addedFirstName,
            addedLastName,
            addedUserName,
            addedPassword,
            addedGender,
            false
          ]);
          console.log(
            "Manager created:" +
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
          let employee = await Employee.find({ _id: addedId }).exec();
          if (employee !== null && employee.length > 0) {
            Employee.DELETE({ _id: addedId });
          } else {
            let client = await Client.find({ _id: addedId }).exec();
            if (client !== null && client.length > 0) {
              Client.DELETE({ _id: addedId });
            } else {
              let vendor = await Vendor.find({ _id: addedId }).exec();
              if (vendor !== null && vendor.length > 0) {
                Vendor.DELETE({ _id: addedId });
              }
            }
          }
        }
      } catch (err) {
        console.log(`Failure ${err}`);
      }
      break;

    case "Employee":
      try {
        let employee = await Employee.find({ _id: addedId }).exec();
        if (employee !== null && employee.length > 0) {
          //if this is a manager and the new role is manager-update
          Employee.UPDATE({
            firstName: addedFirstName,
            lastName: addedLastName,
            _id: addedId,
            userName: addedUserName,
            gender: addedGender,
            password: addedPassword,
            isDeleted: false,
            numOfBranch: addedNumOfBranch
          });
        } //if this is not a manager - need to add it to managers and delete from old place if there is list with it
        else {
          await Employee.CREATE([
            addedId,
            addedFirstName,
            addedLastName,
            addedUserName,
            addedPassword,
            addedGender,
            false,
            addedNumOfBranch
          ]);
          console.log(
            "Employee created:" +
              [
                addedId,
                addedFirstName,
                addedLastName,
                addedUserName,
                addedPassword,
                addedGender,
                "false",
                addedNumOfBranch
              ]
          );
          let manager = await Manager.find({ _id: addedId }).exec();
          if (manager !== null && manager.length > 0) {
            Manager.DELETE({ _id: addedId });
          } else {
            let client = await Client.find({ _id: addedId }).exec();
            if (client !== null && client.length > 0) {
              Client.DELETE({ _id: addedId });
            } else {
              let vendor = await Vendor.find({ _id: addedId }).exec();
              if (vendor !== null && vendor.length > 0) {
                Vendor.DELETE({ _id: addedId });
              }
            }
          }
        }
      } catch (err) {
        console.log(`Failure ${err}`);
      }
      break;
    case "Client":
      try {
        let client = await Client.find({ _id: addedId }).exec();
        if (client !== null && client.length > 0) {
          Client.UPDATE({
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
          await Client.CREATE([
            addedId,
            addedFirstName,
            addedLastName,
            addedUserName,
            addedPassword,
            addedGender,
            false
          ]);
          console.log(
            "Client created:" +
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
          let employee = await Employee.find({ _id: addedId }).exec();
          if (employee !== null && employee.length > 0) {
            Employee.DELETE({ _id: addedId });
          } else {
            let manager = await Manager.find({ _id: addedId }).exec();
            if (manager !== null && manager.length > 0) {
              Manager.DELETE({ _id: addedId });
            } else {
              let vendor = await Vendor.find({ _id: addedId }).exec();
              if (vendor !== null && vendor.length > 0) {
                Vendor.DELETE({ _id: addedId });
              }
            }
          }
        }
      } catch (err) {
        console.log(`Failure ${err}`);
      }
      break;
    case "Vendor":
      try {
        let vendor = await Vendor.find({ _id: addedId }).exec();
        if (vendor !== null && vendor.length > 0) {
          //if this is a manager and the new role is manager-update
          Vendor.UPDATE({
            firstName: addedFirstName,
            lastName: addedLastName,
            _id: addedId,
            userName: addedUserName,
            gender: addedGender,
            password: addedPassword,
            isDeleted: false,
            supply: addedSupply
          });
        } //if this is not a manager - need to add it to managers and delete from old place if there is list with it
        else {
          await Vendor.CREATE([
            addedId,
            addedFirstName,
            addedLastName,
            addedUserName,
            addedPassword,
            addedGender,
            false,
            addedSupply
          ]);
          console.log(
            "Vendor created:" +
              [
                addedId,
                addedFirstName,
                addedLastName,
                addedUserName,
                addedPassword,
                addedGender,
                "false",
                addedSupply
              ]
          );
          let employee = await Employee.find({ _id: addedId }).exec();
          if (employee !== null && employee.length > 0) {
            Employee.DELETE({ _id: addedId });
          } else {
            let client = await Client.find({ _id: addedId }).exec();
            if (client !== null && client.length > 0) {
              Client.DELETE({ _id: addedId });
            } else {
              let manager = await Manager.find({ _id: addedId }).exec();
              if (manager !== null && manager.length > 0) {
                Manager.DELETE({ _id: addedId });
              }
            }
          }
        }
      } catch (err) {
        console.log(`Failure ${err}`);
      }
      break;
    default:
      res.end("ERROR");
  }
  res.end("OK");
});

router.get("/addUserToEmployee", async function(req, res) {
  let addedId = req.query.id;
  let addedFirstName = req.query.firstName;
  let addedLastName = req.query.lastName;
  let addedUserName = req.query.userName;
  let addedGender = req.query.gender;
  let addedRole = req.query.role;
  let addedPassword = req.query.password;

  try {
    let client = await Client.find({ _id: addedId }).exec();
    if (client !== null && client.length > 0) {
      //if this is a manager and the new role is manager-update
      Client.UPDATE({
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
      await Client.CREATE([
        addedId,
        addedFirstName,
        addedLastName,
        addedUserName,
        addedPassword,
        addedGender,
        false
      ]);
      console.log(
        "Client created:" +
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
    res.end("ERROR");
  }

  res.end("OK");
});

router.get("/aboutUs", function(req, res) {
  fs.readFile("views/aboutUs.txt", { encoding: "utf-8" }, function(err, data) {
    if (!err) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      //res.end();
    }
  });
});

router.get("/contact", function(req, res) {
  fs.readFile("views/contact.txt", { encoding: "utf-8" }, function(err, data) {
    if (!err) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      //res.end();
    }
  });
});

router.get("/branches", connectEnsureLogin.ensureLoggedIn(), async function(
  req,
  res
) {
  let userName = req.query.name;
  let branches = await Branch.find({ isDeleted: false }).exec();
  console.log(branches);
  if (branches !== null && branches.length > 0)
    res.render("branches.ejs", { branches: branches });
  else res.render("branches.ejs", { branches: [] });
});

router.get(
  "/flowersCatalog",
  connectEnsureLogin.ensureLoggedIn(),
  async function(req, res) {
    var userName = req.query.name;
    let vendor = await Vendor.find({
      userName: userName,
      isDeleted: false
    }).exec();
    let flowers = await Flower.find({ isDeleted: false }).exec();
    if (vendor !== null && vendor.length > 0) {
      res.render("flowersCatalogVendors.ejs", { flowers: flowers });
    } else {
      res.render("flowersCatalog.ejs", { flowers: flowers });
    }
  }
);

router.get(
  "/usersManagment",
  connectEnsureLogin.ensureLoggedIn(),
  async function(req, res) {
    var userName = req.query.name;
    var type = "";

    let manager = await Manager.find({
      userName: userName,
      isDeleted: false
    }).exec();
    if (manager !== null && manager.length > 0) {
      type = "Manager";
    } else {
      let employee = await Employee.find({
        userName: userName,
        isDeleted: false
      }).exec();
      if (employee !== null && employee.length > 0) type = "Employee";
    }

    switch (type) {
      case "Manager":
        await loadUsers(userName);
        res.render("usersManagmentManager.ejs", { usersLst: usersLst });
        break;
      case "Employee":
        await employeeLoadUsers(userName);
        res.render("usersManagmentEmployee.ejs", {
          employeeUsersLst: employeeUsersLst,
          employeesLst: employeesLst
        });
        break;
    }
  }
);

router.get("/contactSend", function(req, res) {
  res.end("Thank You!");
  //res.end();
});

router.get("/logout", connectEnsureLogin.ensureLoggedIn(), function(req, res) {
  //req.logOut();
  //req.session.destroy();
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

router.post(
  "/addFlower",
  connectEnsureLogin.ensureLoggedIn(),
  upload.single("fileUpload"),
  async function(req, res, next) {
    try {
      var vendorUserName = req.body.vendor;
      var flowerName = req.body.name;
      var flowerColor = req.body.color;
      var flowerPrice = req.body.price;
      var flowerDesc = req.body.desc;
      var n_match = ntc.name(flowerColor);
      let n_rgb = n_match[0]; // RGB value of closest match
      let n_name = n_match[1]; // Text string: Color name
      let n_exactmatch = n_match[2]; // True if exact color match
      /* if((flowerName==null || flowerName.length==0)||(n_name==null || n_name.length==0)||(flowerPrice==null || flowerPrice.length==0)||(req.file===undefined))
	   {
		   console.log("Request with empty necessary fields!");
		  res.end("Empty Fields");
	   }
	   else{*/
      var flower = await Flower.find({
        name: flowerName,
        color: n_name
      }).exec();
      if (flower !== null && flower.length > 0) {
        console.log("The flower already exist!");
        res.end("Exist");
      } else {
        await Flower.CREATE([
          flowerName,
          n_name,
          req.file.filename,
          flowerPrice,
          flowerDesc,
          false
        ]);
        console.log(
          "Flower created:" +
            [
              flowerName,
              n_name,
              req.file.filename,
              flowerPrice,
              flowerDesc,
              "false"
            ]
        );

        var vendor = await Vendor.find({ userName: vendorUserName }).exec();
        if (vendor !== null && vendor.length > 0) console.log(vendor);
        console.log(vendor[0].supply);
        let supplyString = "";
        let tmp = ", ";
        if (vendor[0].supply !== null && vendor[0].supply.length > 0)
          supplyString = vendor[0].supply.concat(tmp);
        else supplyString = "";
        // console.log(supplyString);
        supplyString = supplyString.concat(flowerName);
        // console.log(supplyString);

        await Vendor.UPDATE({
          firstName: vendor[0].firstName,
          lastName: vendor[0].lastName,
          _id: vendor[0].id,
          userName: vendor[0].userName,
          gender: vendor[0].gender,
          password: vendor[0].password,
          isDeleted: false,
          supply: String(supplyString)
        });
        //console.log(supplyString);
        let flowers = await Flower.find({ isDeleted: false }).exec();
        if (flowers !== null && flowers.length > 0)
          res.render("flowersList", { flowers: flowers });
        else res.render("flowersList", { flowers: [] });
      }
      //}
    } catch (err) {
      console.log(err);
      res.send(404);
    }
  }
);

module.exports = router;
