import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { formatNumber } from "../../helpers/utils";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { CartContext } from "../../contexts/CartContext";
import CardMedia from "@material-ui/core/CardMedia";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title1: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function SimpleCard(item) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title1}
          color="textSecondary"
          gutterBottom
        >
          {item.quantity}
        </Typography>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item.price}
        </Typography>
        <Typography variant="body2" component="p">
          {formatNumber(item.price * item.quantity)}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default function Review({ addresses, payments, name }) {
  const { total, cartItems } = useContext(CartContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product, index /*SimpleCard(product)*/) => (
          <div>
            <ListItem
              key={index}
              className={classes.listItem}
              key={product.name}
            >
              <ListItemText
                primary={product.name}
                secondary={formatNumber(product.price)}
              />
              <ListItemText
                className="text-right "
                primary={product.quantity}
                secondary={formatNumber(product.price * product.quantity)}
              />
              <CardMedia image={product.image} />
            </ListItem>
          </div>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {formatNumber(total)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
