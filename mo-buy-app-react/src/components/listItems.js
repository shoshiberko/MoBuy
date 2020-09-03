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

const mainListItems = (
  <div>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link href="/SignIn">
      <ListItem button>
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link href="/Market">
      <ListItem button>
        <ListItemIcon>
          <MarketIcon />
        </ListItemIcon>
        <ListItemText primary="Market" />
      </ListItem>
    </Link>
    <Link href="/SavedItems">
      <ListItem button>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Saved Items" />
      </ListItem>
    </Link>
    <Link href="/MyOrders">
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="My Orders" />
      </ListItem>
    </Link>
    <Link href="/Branches">
      <ListItem button>
        <ListItemIcon>
          <BranchesIcon />
        </ListItemIcon>
        <ListItemText primary="Branches" />
      </ListItem>
    </Link>
    <Link href="/AboutUs">
      <ListItem button>
        <ListItemIcon>
          <AboutUsIcon />
        </ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItem>
    </Link>
    <Link href="/ContactUs">
      <ListItem button>
        <ListItemIcon>
          <ContactUsIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Us" />
      </ListItem>
    </Link>
  </div>
);
export default mainListItems;
