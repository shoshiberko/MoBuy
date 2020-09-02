import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Rating from "@material-ui/lab/Rating";
import $ from "jquery";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ product, renderProductsGrid }) {
  const [saved, setSaved] = React.useState(product.savedItem);
  const handleProductChangedSaved = () => {
    var data = {
      emailAddress: sessionStorage.getItem("userEmail"),
      productId: product.id,
      state: !saved,
    };

    if (saved && renderProductsGrid !== undefined) {
      //if the item is not saved now- after user clicked the favorite icon and there is need to remove thie product from the grid
      renderProductsGrid(product.id);
    } else {
      setSaved(!saved);
    }

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/StateSavedItem",
      data: data,
    })
      .done(function(data) {})
      .fail(function(jqXhr) {});

    //here we need to update  the db (send a request to the server in order to update this user's product is saved )
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <div className="text-right">
            {isInCart(product) && (
              <IconButton
                aria-label="add more"
                onClick={() => increase(product)} //Add more
              >
                <AddShoppingCartIcon color="primary" />
              </IconButton>
            )}

            {!isInCart(product) && ( //Add to cart
              <IconButton
                aria-label="add to shopping cart"
                onClick={() => addProduct(product)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            )}
          </div>
        }
        title={product.name}
        subheader={formatNumber(product.price)}
      />

      <CardMedia className={classes.media} image={product.photo} title="" />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleProductChangedSaved}
        >
          {!saved && <FavoriteBorderIcon />}
          {saved && <FavoriteIcon />}
        </IconButton>
        <IconButton aria-label="preview" component="a" href="/Id">
          <VisibilityIcon />
        </IconButton>
        <Rating
          name="read-only"
          precision={0.5}
          value={product.rating}
          readOnly
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.moreDetails}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
