import React, { useContext } from "react";
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
import ContantUs from "./ContantUs";
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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const drawerWidth = 240;
const theme = createMuiTheme({
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
    fontFamily: "Roboto Condensed",
  },
  /*typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },*/
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  fullScreen: {
    width: "100vw",
    height: "100vh",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

function SignInAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          MoBuy
        </Typography>
        <Tooltip title="Login">
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="About Us">
          <IconButton color="inherit">
            <InfoRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Contact Us">
          <IconButton color="inherit">
            <ContactSupportRoundedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
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
    <ThemeProvider theme={theme}>
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
              </div>
            )}
          />
          <Route
            exact
            from="/ContactUs"
            render={(props) => <MainWindow {...props} />}
          />
          <Route
            exact
            from="/AboutUs"
            render={(props) => <MainWindow {...props} />}
          />
          <Route
            exact
            from="/Cart"
            render={(props) => <MainWindow {...props} />}
          />
          <Route
            exact
            from="/Checkout"
            render={(props) => <MainWindow {...props} />}
          />
          <Route
            exact
            from="/Market"
            render={(props) => <MainWindow {...props} />}
          />

          <Route
            exact
            from="/SavedItems"
            render={(props) => <MainWindow {...props} />}
          />
          <Route path="/ViewProductItem/:productId" component={MainWindow} />
        </Switch>
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}
