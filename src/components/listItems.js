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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const CustomLink = (
  <div>
    <Link to="/"></Link>
  </div>
);

const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component="a" href="/SignIn">
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button component="a" href="/Market">
      <ListItemIcon>
        <MarketIcon />
      </ListItemIcon>
      <ListItemText primary="Market" />
    </ListItem>
    <ListItem button component="a" href="/SavedItems">
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Saved Items" />
    </ListItem>
    <ListItem button component="a" href="/Branches">
      <ListItemIcon>
        <BranchesIcon />
      </ListItemIcon>
      <ListItemText primary="Branches" />
    </ListItem>
    <ListItem button component="a" href="/AboutUs">
      <ListItemIcon>
        <AboutUsIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem button component="a" href="/ContactUs">
      <ListItemIcon>
        <ContactUsIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
  </div>
);
export default mainListItems;
