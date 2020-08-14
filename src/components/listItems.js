import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import MarketIcon from "@material-ui/icons/Storefront";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import BranchesIcon from "@material-ui/icons/Place";
import AboutUsIcon from "@material-ui/icons/Info";
import ContactUsIcon from "@material-ui/icons/ContactSupport";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MarketIcon />
      </ListItemIcon>
      <ListItemText primary="Market" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HeartIcon />
      </ListItemIcon>
      <ListItemText primary="Saved Items" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BranchesIcon />
      </ListItemIcon>
      <ListItemText primary="Branches" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AboutUsIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ContactUsIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
  </div>
);
