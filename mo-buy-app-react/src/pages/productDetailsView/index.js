import React from "react";
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
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  }
];

class ComplexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { full: 0, isVisible: 0 };
    this.handleClick = this.handleHeartClick.bind(this);
    this.toggleVisibility = this.toggleVisibilityFunc.bind(this);
  }
  toggleVisibilityFunc() {
    const { full, isVisible } = this.state;
    if (isVisible) this.setState({ isVisible: 0 });
    else this.setState({ isVisible: 1 });
  }
  handleHeartClick() {
    const { full, isVisible } = this.state;
    if (full) this.setState({ full: 0 });
    else this.setState({ full: 1 });
  }

  render() {
    const { full, isVisible } = this.state;
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
                    Phone Name
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Price
                  </Typography>
                  <Rating precision={0.5} value={3.5} readOnly />
                  <ColorPicker
                    colors={[
                      { hex: "#000000", selected: false },
                      { hex: "#E53B2C", selected: false },
                      { hex: "#0000FF", selected: false },
                      { hex: "#FFFFFF", selected: false }
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
                <div>
                  <Button onClick={this.toggleVisibility}>
                    {isVisible ? "Hide details" : "Show details"}
                  </Button>
                  {isVisible ? (
                    <div>
                      <p>
                        When the button is click I do want this component or
                        text to be shown - so my question is how do I hide the
                        component
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <Comments />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default ComplexGrid;
