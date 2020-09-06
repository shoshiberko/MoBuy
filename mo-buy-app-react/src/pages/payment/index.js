import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { CartContext } from "../../contexts/CartContext";
import $ from "jquery";

export default function Checkout() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  const { clearCart } = useContext(CartContext);

  const steps = ["Shipping address", "Payment details", "Review your order"];
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addresses, addressesSet] = React.useState([]);
  const [name, nameSet] = React.useState("");
  const [payments, paymentsSet] = React.useState([]);
  const [orderId, orderIdSet] = React.useState(0);
  const { total, cartItems } = useContext(CartContext);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = () => {
    ////////send order to the server

    var data = {
      emailAddress: sessionStorage.getItem("userEmail"),
      productsList: cartItems.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: "0xffffff",
          count: item.quantity,
          itemPrice: item.price,
        };
      }),
      addresses: addresses.join(","),
      payments: {
        cardType: payments[0].detail,
        cardHolder: payments[1].detail,
        cardNumber4LastDigits: payments[2].detail,
        totalPrice: total,
      },
    };

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/PlaceOrder",
      data: data,
    })
      .done(function(data) {
        orderIdSet(data);
        clearCart();
        handleNext();
      })
      .fail(function(jqXhr) {
        alert("Sorry! your order is not received, please try again ");
      });
  };

  const handlePayment = (formPaymentData) => {
    let creditCardNumber = formPaymentData.number;
    let cardNumber4LastDigits = creditCardNumber.substr(
      creditCardNumber.length - 4
    );
    console.log(formPaymentData);
    paymentsSet([
      { name: "Card type", detail: formPaymentData.issuer.toUpperCase() },
      { name: "Card holder", detail: formPaymentData.name },
      { name: "Last card digits", detail: cardNumber4LastDigits },
      { name: "Cvc", detail: formPaymentData.cvc },
      { name: "Expiry date", detail: formPaymentData.expiry },
    ]);
    handleNext();
  };

  const handleAddress = ({
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
  }) => {
    addressesSet([address1, address2, city, state, zip, country]);
    nameSet(firstName + lastName);

    handleNext();
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleAddressProps={handleAddress} />;
      case 1:
        return <PaymentForm handlePaymentProps={handlePayment} />;
      case 2:
        return <Review addresses={addresses} name={name} payments={payments} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  {"Your order number is " +
                    orderId +
                    ". We have emailed your order\\n confirmation, and will send you an update when your order has\\nshipped."}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      className={classes.button}
                    >
                      Place order
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
