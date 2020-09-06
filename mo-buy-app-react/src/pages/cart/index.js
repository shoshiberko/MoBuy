import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import CartProducts from "./CartProducts";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fullScreen: {
    width: "100vw",
    height: "100vh",
  },
}));

const Cart = () => {
  const classes = useStyles();
  let history = useHistory();
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
  } = useContext(CartContext);

  function redirectCheckOut(e) {
    //e.preventDefault();
    history.push("/Checkout");
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Cart
      </Typography>

      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">
          {cartItems.length > 0 ? (
            <CartProducts />
          ) : (
            <div className="p-3 text-center text-muted">Your cart is empty</div>
          )}

          {checkout && (
            <div className="p-3 text-center text-success">
              <p>Checkout successfull</p>
              <Link to="/" className="btn btn-outline-success btn-sm">
                BUY MORE
              </Link>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="col-sm-3 p-3">
            <div className="card card-body">
              <p className="mb-1">Total Items</p>
              <h4 className=" mb-3 txt-right">{itemCount}</h4>
              <p className="mb-1">Total Payment</p>
              <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
              <hr className="my-4" />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={redirectCheckOut}
                >
                  CHECKOUT
                </button>

                <button
                  type="button"
                  className="btn btn-outlineprimary btn-sm"
                  onClick={clearCart}
                >
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
