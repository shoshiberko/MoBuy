import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default class AddressForm extends React.Component {
  constructor({ handleAddressProps }) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      handleAddress: handleAddressProps,
    };
  }

  handleClick = () => {
    const { handleAddress } = this.state;
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
    } = this.state;
    handleAddress({
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      country: country,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={(e) => {
                this.setState({ address1: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              onChange={(e) => {
                this.setState({ address2: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={(e) => {
                this.setState({ city: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              onChange={(e) => {
                this.setState({ state: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={(e) => {
                this.setState({ zip: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              onChange={(e) => {
                this.setState({ country: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          <Grid item xs={12} className="text-right ml-5">
            <Button onClick={this.handleClick} variant="contained">
              next
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
