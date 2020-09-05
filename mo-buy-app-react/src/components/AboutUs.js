import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import img from "./backgroundImages/phone_background12.jpg";
import img1 from "./backgroundImages/phone_background13.jpg";
import img2 from "./backgroundImages/phone_background1.jpg";
import img3 from "./backgroundImages/phone_background2.jpg";

import img4 from "./backgroundImages/phone_background3.jpg";
import img5 from "./backgroundImages/phone_background4.jpg";
import img6 from "./backgroundImages/phone_background5.jpg";
import img7 from "./backgroundImages/phone_background6.jpg";
import img8 from "./backgroundImages/phone_background8.jpg";
import img9 from "./backgroundImages/phone_background14.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
    backgroundColor: "rgb(255, 230, 230)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },

  galary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleGalary: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function AboutUsForm() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} />
        <Grid item xs={12} />
        <Grid item xs={12} />
      </Grid>
      <br />
      <Paper className={classes.mainFeaturedPost}>
        {/* Increase the priority of the hero background image */}

        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography variant="h3" color="inherit">
                About Us
              </Typography>
              <br />
              <Typography variant="h4" color="inherit" paragraph>
                WHAT WE DO?
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                MOBUY gives you a chance to quickly and easily find the phone
                you want and have it delivered to your home in no time,
                regardless of your location, as long as it is in one of the
                countries of the world.
              </Typography>
              <Typography variant="h4" color="inherit" paragraph>
                WHY DO CUSTOMERS LOVE US?
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                We have been in the business for quite a while now, and it that
                time we have not only managed to make close relationships with
                numerous suppliers all over the world, but also to recognize
                what people need. This means that we are always able to offer
                all the latest phones, great prices, reliable service, fast
                delivery and premium customer support.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Typography variant="h3" color="inherit" align="center">
        Galary
      </Typography>
      <p>Satisfied Customers</p>
      <Paper>
        {/* Increase the priority of the hero background image */}

        <GridList cols={3}>
          <GridListTile>
            <img src={img1} />
          </GridListTile>
          <GridListTile>
            <img src={img2} />
          </GridListTile>
          <GridListTile>
            <img src={img3} />
          </GridListTile>
        </GridList>
        <GridList cols={3}>
          <GridListTile>
            <img src={img4} />
          </GridListTile>
          <GridListTile>
            <img src={img5} />
          </GridListTile>
          <GridListTile>
            <img src={img6} />
          </GridListTile>
        </GridList>
        <GridList cols={3}>
          <GridListTile>
            <img src={img7} />
          </GridListTile>
          <GridListTile>
            <img src={img8} />
          </GridListTile>
          <GridListTile>
            <img src={img9} />
          </GridListTile>
        </GridList>
      </Paper>
      <br />
    </div>
  );
}
