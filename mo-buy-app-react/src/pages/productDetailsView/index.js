/*import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "@material-ui/core/Button";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";
//import { SketchPicker } from "react-color";
import Rating from "@material-ui/lab/Rating";
import ColorPicker from "react-circle-color-picker";
import Comments from "./Comments";
import Magnifier from "react-magnifier";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

class ComplexGrid extends React.Component {
  constructor({match}) {
    super();
    this.params = match.params;
    this.state = { full: 0, isVisible: 0 , product: {}};
    this.handleClick = this.handleHeartClick.bind(this);
    this.toggleVisibility = this.toggleVisibilityFunc.bind(this);
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
    } catch (err) {
      console.log(err);
    }
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
    const { full, isVisible, product } = this.state;
    return (
      <div>
        <Paper elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs container>
              <ImageGallery items={images} maxWidth="xs" />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {product.name+", "+product.company}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                   {product.price}
                  </Typography>
                  <Rating precision={0.5} value={product.rating} readOnly />
                  <ColorPicker
                    colors={product.colorList}
                  />
                </Grid>
                <Grid item xs container>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ maxWidth: "130px", maxHeight: "30px" }}
                  >
                    Add to cart
                  </Button>
                  <IconButton
                    onClick={this.handleClick}
                    style={{ maxWidth: "130px", maxHeight: "30px" }}
                  >
                    {full ? <FullHeartIcon /> : <BorderHeartIcon />}
                  </IconButton>
                </Grid>
                <div>
                  <Button onClick={this.toggleVisibility}>
                    {isVisible ? "Hide details" : "Show details"}
                  </Button>
                  {isVisible ? (
                    <div>
                      <p>
                        {product.moreDetails}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <Comments/>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default ComplexGrid;
*/


import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "@material-ui/core/Button";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

function generate(element, listItem) {
  return listItem.map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

/*const product = {
  id: 207,
  name: "Galaxi S9",
  price: 500,
  imagesList: ["", "", ""], //String's array
  rating: 0,
  numOfRatings: 0,
  moreDetails: ["hi", "ggg", "ggg"],
  colorsList: ["0x000000", "0xffffff"], // string's list (hex color in rgb)
  productType: "phone",
  company: "SAMSUNG",
  commentsList: [], //array of comments id (id-s from the comment schema)
  isDeleted: false,
};*/
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
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

 constructor({match}) {
  super();
  this.params = match.params;
  this.state = { full: 0, isVisible: 0 , product: {}};
  this.handleClick = this.handleHeartClick.bind(this);
  this.toggleVisibility = this.toggleVisibilityFunc.bind(this);
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
    } catch (err) {
      console.log(err);
    }
  }

  toggleVisibilityFunc() {
    const { full, isVisible, product  } = this.state;
    if (isVisible) this.setState({ isVisible: 0 });
    else this.setState({ isVisible: 1 });
  }
  handleHeartClick() {
    const { full, isVisible , product } = this.state;
    if (full) this.setState({ full: 0 });
    else this.setState({ full: 1 });
  }

  render() {
    const { classes } = this.props;
    const { full, isVisible, product } = this.state;
    return (
      <div>
        <div div className="text-center mt-5">
          <Grid container spacing={3}>
            <Grid item xs={12} />
            <Grid item xs={12}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <ImageGallery items={images} maxWidth="xs" />
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
                    <Chip
                      variant="outlined"
                      size="madium"
                      label={product.company}
                    />
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
                  <Rating precision={0.5} value={product.rating} readOnly />
                </Grid>

                <Grid item>
                  <ColorPicker
                    colors={[
                      { hex: "#000000", selected: false },
                      { hex: "#E53B2C", selected: false },
                      { hex: "#0000FF", selected: false },
                      { hex: "#FFFFFF", selected: false },
                    ]}
                  />
                </Grid>
                <Grid item xs container>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ maxWidth: "130px", maxHeight: "30px" }}
                  >
                    Add to cart
                  </Button>
                  <IconButton
                    onClick={this.handleClick}
                    style={{ maxWidth: "130px", maxHeight: "30px" }}
                  >
                    {full ? <FullHeartIcon /> : <BorderHeartIcon />}
                  </IconButton>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom className="text-left mr-5">
                Free delivery
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
              <div>
                <Button onClick={this.toggleVisibility}>
                  {isVisible ? "Hide details" : "Show details"}
                </Button>
                {isVisible ? (
                  <div>
                    <List>
                      {product.moreDetails !== undefined &&
                        product.moreDetails.map((item, index) => (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <FolderIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary="Single-line item"
                              secondary={item}
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                    </List>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </Grid>
            <Grid item xs={12} className="text-left ml-5">
              <Comments product={product} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ComplexGrid);
