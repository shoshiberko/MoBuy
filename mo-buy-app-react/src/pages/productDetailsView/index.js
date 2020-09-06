import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CartContext } from "../../contexts/CartContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ButtonUp from "@material-ui/core/Button";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";
//import { SketchPicker } from "react-color";
import Rating from "@material-ui/lab/Rating";
import ColorPicker from "react-circle-color-picker";
import Comments from "./Comments";
import { formatNumber } from "../../helpers/utils";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import BatteryCharging90Icon from "@material-ui/icons/BatteryCharging90";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import ReactDOM from "react-dom";
//import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
//import Avatar from "@material-ui/core/Avatar";
import $ from "jquery";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
//import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

function generate(element, listItem) {
  return listItem.map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const OurCommants = ({ list }) => {
  const classes = useStyles();
  return (
    <List>
      {list !== undefined &&
        list.map((item) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {item.userImage !== undefined && item.userImage.length === 1 ? (
                <Avatar>{item.userImage}</Avatar>
              ) : (
                <Avatar src={item.userImage} />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.time}
                  </Typography>
                  <Rating
                    name="half-rating"
                    defaultValue={item.rating}
                    precision={0.5}
                    readOnly
                  />
                  <br />
                  {item.commentsData}
                </React.Fragment>
              }
            />
            <Divider />
          </ListItem>
        ))}
    </List>
  );
};

const images = [
  {
    original: "../../Phones/S7/S7_1.png", //"https://picsum.photos/id/1018/1000/600/",
    thumbnail: "../../Phones/S7/S7_1.png", //,"https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "../../Phones/S7/S7_2.png", //"https://picsum.photos/id/1015/1000/600/",
    thumbnail: "../../Phones/S7/S7_2.png", //"https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "../../Phones/S7/S7_3.png", //"https://picsum.photos/id/1019/1000/600/",
    thumbnail: "../../Phones/S7/S7_3.png", //"https://picsum.photos/id/1019/250/150/",
  },
];

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  price: {
    color: theme.palette.error.main,
  },
});

class ComplexGrid extends React.Component {
  static contextType = CartContext;
  constructor({ match }) {
    super();
    this.params = match.params;

    this.state = {
      full: 0,
      isVisible: 0,
      product: {},
      rating: 0,
      commentText: "",
      commentsList: [],
    };
    this.handleClick = this.handleHeartClick.bind(this);
    this.toggleVisibility = this.toggleVisibilityFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  async componentDidMount() {
    try {
      const resp = await fetch("/GetProductItem?Id=" + this.params.productId);
      if (!resp.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw Error(resp.statusText);
      }
      const product = await resp.json();
      this.setState({ product: product });

      console.log("rating", product.rating);
      const resp1 = await fetch(
        "/GetCommentsList?productId=" + this.params.productId
      );
      if (!resp1.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw Error(resp1.statusText);
      }
      const data = await resp1.json();
      this.setState({ commentsList: data });
    } catch (err) {
      console.log(err);
    }
  }
  handleChange(e, { name, value }) {
    this.setState({ commentText: value });
  }
  handleChangeRating(e, value) {
    this.setState({ rating: value });
  }
  async forceUpdateHandler() {
    const {
      full,
      isVisible,
      product,
      rating,
      commentText,
      commentsList,
    } = this.state;
    let nowDate = new Date();
    let day = nowDate.getDate();
    if (day < 10) day = "0" + day;
    let month = nowDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let hour = nowDate.getHours();
    if (hour < 10) hour = "0" + hour;
    let minutes = nowDate.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let time =
      day +
      "." +
      month +
      "." +
      nowDate.getFullYear() +
      ", " +
      hour +
      ":" +
      minutes;
    let comment = {
      emailAddress: sessionStorage.getItem("userEmail"),
      time: time,
      text: commentText,
      rating: rating,
    };
    var dataR = {
      productId: product._id,
      comment: comment,
    };
    var queryStr =
      "&emailAddress=" +
      sessionStorage.getItem("userEmail") +
      "&time=" +
      time +
      "&text=" +
      commentText +
      "&rating=" +
      rating;
    const resp = await fetch(
      "/AddCommentToProduct?productId=" + this.params.productId + queryStr
    );
    if (!resp.ok) {
      // noinspection ExceptionCaughtLocallyJS
      console.log("s");
      throw Error(resp.statusText);
    }
    const data = await resp.json();
    //this.setState({commentsList:data});
    if (commentsList !== undefined)
      this.setState({ commentsList: commentsList.concat(data) });
    else this.setState({ commentsList: [data] });

    this.forceUpdate();
    this.setState({ rating: 0, commentText: "" });
  }
  toggleVisibilityFunc() {
    const { full, isVisible, product } = this.state;
    if (isVisible) this.setState({ isVisible: 0 });
    else this.setState({ isVisible: 1 });
  }
  handleHeartClick() {
    const { full, isVisible, product } = this.state;
    if (full) this.setState({ full: 0 });
    else this.setState({ full: 1 });
  }

  render() {
    const cartContext = this.context;
    const { classes } = this.props;
    const {
      full,
      isVisible,
      product,
      rating,
      commentText,
      commentsList,
    } = this.state;
    var imagesList = [];
    if (product !== undefined && product.imagesList !== undefined)
      imagesList = product.imagesList.map((item) => {
        return { original: item, thumbnail: item };
      });
    return (
      <div>
        <div div className="text-center mt-5">
          <Grid container spacing={3}>
            <Grid item xs={12} />
            <Grid item xs={12}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              {product.imagesList !== undefined && (
                <ImageGallery
                  showBullets="true"
                  items={imagesList /*product.imagesList*/}
                  maxWidth="xs"
                />
              )}
            </Grid>

            <Grid item xs={3} className="text-left ml-5">
              <Grid container direction="column">
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography gutterBottom variant="h3">
                      {product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} className="mt-3">
                    {(product.company === "Apple" && (
                      <AppleIcon color="primary" />
                    )) || (
                      <Chip
                        variant="outlined"
                        size="madium"
                        label={product.company}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.price}
                  >
                    {formatNumber(product.price)}
                  </Typography>
                  <br />
                  <Rating
                    precision={0.5}
                    value={parseFloat(product.rating)}
                    size="large"
                    readOnly
                  />
                  <br />
                  <br />
                </Grid>

                <Grid item>
                  <ColorPicker
                    colors={[
                      { hex: "#000000", selected: false },
                      { hex: "#FFFFFF", selected: false },
                    ]}
                  />
                  <br />
                  <br />
                </Grid>
                <Grid item xs container>
                  <ButtonUp
                    variant="contained"
                    color="secondary"
                    style={{ maxWidth: "160px", maxHeight: "30px" }}
                    onClick={() => cartContext.addProduct(product)}
                  >
                    Add to cart
                  </ButtonUp>
                  <IconButton
                    onClick={this.handleClick}
                    style={{ maxWidth: "130px", maxHeight: "30px" }}
                  >
                    {full ? <FullHeartIcon /> : <BorderHeartIcon />}
                  </IconButton>
                </Grid>
                <br />
                <br />
              </Grid>

              <Typography variant="h6" gutterBottom className="text-left mr-5">
                Free delivery
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      More Details...
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {product.moreDetails !== undefined &&
                      product.moreDetails.map((item, index) => {
                        switch (index) {
                          case 0:
                            return (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <div>
                                      {item === "Android" && (
                                        <AndroidIcon color="primary" />
                                      )}
                                      {item === "iOS" && (
                                        <AppleIcon color="primary" />
                                      )}
                                    </div>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="OS: " secondary={item} />
                              </ListItem>
                            );
                            break;
                          case 1:
                            return (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <BatteryCharging90Icon color="primary" />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Battery:"
                                  secondary={item + " Amp"}
                                />
                              </ListItem>
                            );
                            break;
                          case 2:
                            return (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <SmartphoneIcon color="primary" />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Screen size: "
                                  secondary={item + " inch"}
                                />
                              </ListItem>
                            );
                            break;
                        }
                      })}
                  </List>
                </AccordionDetails>
              </Accordion>
              <div>
                <hr style={{ margin: "60px 0 30px" }}></hr>
                <Grid item className="text-left ml-5">
                  {product !== undefined && (
                    <Comment.Group id="commentsList">
                      <Header as="h3" dividing>
                        Feedbacks
                      </Header>
                      <OurCommants list={commentsList} />
                      <Form size="big" reply>
                        <Form.Field>
                          <Rating
                            name="rating"
                            value={rating}
                            precision={0.5}
                            onChange={this.handleChangeRating}
                          />
                        </Form.Field>
                        <Form.TextArea
                          placeholder="You have a comment?"
                          name="commentText"
                          value={commentText}
                          onChange={this.handleChange}
                        />
                        <Button
                          content="Add Comment"
                          labelPosition="left"
                          icon="edit"
                          onClick={this.forceUpdateHandler}
                          primary
                        />
                      </Form>
                    </Comment.Group>
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ComplexGrid);
