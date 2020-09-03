import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CartIcon from "@material-ui/icons/ShoppingCart";
import mainListItems /*, secondaryListItems*/ from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "../pages/cart";
import HomePage from "./HomePage";
import Store from "../pages/store";
import SavedItems from "../pages/savedItems";
import { formatNumber } from "../helpers/utils";
import { CartContext } from "../contexts/CartContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
import Welcome from "./Welcome";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  floatingButton: {
    paddingBottom: theme.spacing(4),
  },
}));
export default function MainWindow() {
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
  } = useContext(CartContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            MoBuy
          </Typography>
          <IconButton color="inherit" component="a" href="/Profile">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" component="a" href="/SignIn">
       <ExitToAppIcon />
        </IconButton>
          <IconButton color="inherit" component="a" href="/Notification">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" href="/Cart">
            <Badge
              badgeContent={itemCount}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <CartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>{mainListItems}</List>
      </Drawer>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route
            exact
            from="/ContactUs"
            render={(props) => <ContantUs {...props} />}
          />
          <Route
            exact
            from="/AboutUs"
            render={(props) => <AboutUs {...props} />}
          />
          <Route exact from="/Cart" render={(props) => <Cart {...props} />} />
          <Route
            exact
            from="/Checkout"
            render={(props) => <Checkout {...props} />}
          />
          <Route
            exact
            from="/Market"
            render={(props) => <Store {...props} />}
          />

          <Route
            exact
            from="/SavedItems"
            render={(props) => <SavedItems {...props} />}
          />
          <Route
            path="/ViewProductItem/:productId"
            component={ProductDetails}
          />
        </Switch>
      </Container>
    </div>
  );
}
