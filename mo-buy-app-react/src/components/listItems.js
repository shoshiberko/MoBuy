import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MarketIcon from "@material-ui/icons/Storefront";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import BranchesIcon from "@material-ui/icons/Place";
import AboutUsIcon from "@material-ui/icons/Info";
import ContactUsIcon from "@material-ui/icons/ContactSupport";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
//import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route /*, Link*/,
} from "react-router-dom";
import Link from "@material-ui/core/Link";

/*const CustomLink = (
  <div>
    <Link to="/"></Link>
  </div>
);*/

class mainListItems extends React.Component {
  pushHistory = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };

  pushHistoryMarket = () => {
    const { history } = this.props;
    history.push("/Market");
  };

  pushHistorySavedItems = () => {
    const { history } = this.props;
    history.push("/SavedItems");
  };

  pushHistoryMyOrders = () => {
    const { history } = this.props;
    history.push("/MyOrders");
  };

  pushHistoryBranches = () => {
    const { history } = this.props;
    history.push("/Branches");
  };

  pushHistoryContactUs = () => {
    const { history } = this.props;
    history.push("/ContactUs");
  };

  pushHistoryAboutUs = () => {
    const { history } = this.props;
    history.push("/AboutUs");
  };
  render() {
    return (
      <div>
        <ListItem button onClick={this.pushHistory}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={this.pushHistorySignIn}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryMarket}>
          <ListItemIcon>
            <MarketIcon />
          </ListItemIcon>
          <ListItemText primary="Market" />
        </ListItem>
        <ListItem button onClick={this.pushHistorySavedItems}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Items" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryMyOrders}>
          <ListItemIcon>
            <AssignmentTurnedInRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryBranches}>
          <ListItemIcon>
            <BranchesIcon />
          </ListItemIcon>
          <ListItemText primary="Branches" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryAboutUs}>
          <ListItemIcon>
            <AboutUsIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button onClick={this.pushHistoryContactUs}>
          <ListItemIcon>
            <ContactUsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </div>
    );
  }
}

export default withRouter(mainListItems);
