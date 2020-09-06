import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CartIcon from "@material-ui/icons/ShoppingCart";
import mainListItems /*, secondaryListItems*/ from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { Route, Switch } from "react-router-dom";
import Cart from "../pages/cart";
import HomePage from "./HomePage";
import Store from "../pages/store";
import SavedItems from "../pages/savedItems";
import { formatNumber } from "../helpers/utils";
import { CartContext } from "../contexts/CartContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";
import ContantInfo from "./ContantInfo";
import ContantUs from "./ContactUs";
import CallIcon from "@material-ui/icons/Call";
import AboutUs from "./AboutUs";
import { Card } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Checkout from "../pages/payment";
import ProductDetails from "../pages/productDetailsView";
import ChatBot from "./ChatBot";
import Typography from "@material-ui/core/Typography";
import Welcome from "./Welcome";
import MainWindow from "./MainWindow";
import SignIn from "./SignIn";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";
import Tooltip from "@material-ui/core/Tooltip";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";

import { useHistory } from "react-router-dom";
import {
  orange,
  cyan,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Footer from "./Footer";

const drawerWidth = 240;
/*const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff8e8c",
      main: "#ff5a5f",
      dark: "#c62035",
      contrastText: "#fff",
    },
    secondary: {
      light: "#4da9b7",
      main: "#017a87",
      dark: "#004e5a",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "Roboto Condensed".
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  titleLogo: {
    fontFamily: "Rajdhani",
    fontSize: 50,
    marginTop: 18,
  },
  Logo: {
    fontSize: 40,
  },
}));

function SignInAppBar() {
  let history = useHistory();
  function redirectSignIn(e) {
    history.push("/SignIn");
  }
  function redirectAboutUs(e) {
    history.push("/AboutUs");
  }
  function redirectContactUs(e) {
    history.push("/ContactUs");
  }

  const classes = useStyles();
  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <p className={classes.titleLogo}>M</p>
        <PhoneIphoneIcon className={classes.Logo} />
        <p className={classes.titleLogo}>BUY</p>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        />
        <Tooltip title="Login">
          <IconButton color="inherit" onClick={redirectSignIn}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="About Us">
          <IconButton color="inherit" onClick={redirectAboutUs}>
            <InfoRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Contact Us">
          <IconButton color="inherit" onClick={redirectContactUs}>
            <ContactSupportRoundedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? cyan[500] : cyan[500];
  const mainSecondaryColor = darkState ? deepPurple[500] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    typography: {
      /* fontFamily: [
        "Roboto Condensed".
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),*/
      fontFamily: ["sans-serif"].join(","),
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
  } = useContext(CartContext);

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Container />

        <Switch>
          <Route
            exact
            from="/SignIn"
            render={(props) => (
              <div>
                <SignInAppBar />
                <SignIn {...props} />
                <Footer />
              </div>
            )}
          />
          <Route exact from="/" render={(props) => <Welcome {...props} />} />
          <Route
            exact
            from="/SignUp"
            render={(props) => (
              <div>
                <SignInAppBar />
                <SignIn {...props} />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/MyOrders"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/ContactUs"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/AboutUs"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/Cart"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/Checkout"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            exact
            from="/Market"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />

          <Route
            exact
            from="/SavedItems"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            from="/ViewProductItem/:productId"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
          <Route
            from="/Branches"
            render={(props) => (
              <div>
                <MainWindow
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
                <Footer />
              </div>
            )}
          />
        </Switch>

        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}
