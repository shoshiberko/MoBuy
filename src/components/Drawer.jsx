import * as React from "react";
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
import mainListItems /*, secondaryListItems*/ from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

const DrawerFunc = props => {
  const { history } = props;
  console.log("drawer", history);
  const classes = useStyles();
  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <List>{mainListItems(history)}</List>
    </Drawer>
  );
};

export default withRouter(DrawerFunc);
