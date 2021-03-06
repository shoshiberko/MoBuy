import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SignUpDialog from "./SignUpDialog";
import { Route, Switch } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import $ from "jquery";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random/?phone)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory();
  const [email, setEmail] = React.useState(localStorage.getItem("userEmail"));
  const [password, setPassword] = React.useState(
    localStorage.getItem("password")
  );
  const [checkedRemember, setChecked] = React.useState(
    JSON.parse(localStorage.getItem("checked"))
  );
  const classes = useStyles();

  useEffect(() => {
    fetch("/LogOut").then(sessionStorage.setItem("userEmail", ""));
  });

  const responseFacebook = (response) => {
    console.log(response);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  function SignUp() {
    let history = useHistory();
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onChangeEmailHandler = (e) => setEmail(e.target.value);
    const onChangePasswordHandler = (e) => setPassword(e.target.value);
    const onChangeFName = (e) => setFName(e.target.value);
    const onChangeLName = (e) => setLName(e.target.value);
    function onSubmitSignUpHandler(e) {
      //var self;
      e.preventDefault();
      //self = this;
      //console.log(this.state);
      var data = {
        emailAddress: email,
        password: password,
        fName: fName,
        lName: lName,
      };
      // Submit form via jQuery/AJAX
      $.ajax({
        type: "POST",
        url: "/SignUp",
        data: data,
      })
        .done(function(data) {
          sessionStorage.setItem("userEmail", email);
          history.push("/Market");
        })
        .fail(function(jqXhr) {
          alert("Try again!!");
        });
    }
    function redirectSignIn(e) {
      //e.preventDefault();
      history.push("/SignIn");
    }
    return (
      <div className={classes.paper}>
        <br />
        <br />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={onSubmitSignUpHandler}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChangeFName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangeLName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeEmailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangePasswordHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={redirectSignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }

  const onChangeEmailHandler = (e) => setEmail(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };
  function submitHandler(e) {
    //var self;

    e.preventDefault();
    //self = this;

    //console.log(this.state);

    var data = {
      emailAddress: email,
      password: password,
    };

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/SignIn",
      data: data,
    })
      .done(function(data) {
        sessionStorage.setItem("userEmail", email);
        history.push("/Market");
        if (checkedRemember) {
          localStorage.setItem("password", password);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("checked", "true");
        } else {
          localStorage.setItem("password", "");
          localStorage.setItem("userEmail", "");
          localStorage.setItem("checked", "false");
        }
        //this.props.history.push("/Market");
      })
      .fail(function(jqXhr) {
        alert("Try again!!");
      });
  }

  /* if(localStorage.getItem("checked"))
{
  setEmail(localStorage.getItem("userEmail"));
  setPassword(localStorage.getItem("password"));
}*/
  function redirectSignUp(e) {
    //e.preventDefault();
    history.push("/SignUp");
  }

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
          <Switch>
            <Route
              exact
              from="/SignIn"
              render={(props) => (
                <div className={classes.paper}>
                  <br />
                  <br />
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form
                    className={classes.form}
                    onSubmit={submitHandler}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={onChangeEmailHandler}
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      value={password}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={onChangePasswordHandler}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          checked={checkedRemember}
                          onChange={handleCheckChange}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                    <FacebookLogin
                      appId="943313892847322" //APP ID NOT CREATED YET
                      fields="name,email,picture"
                      callback={responseFacebook}
                    />
                    <GoogleLogin
                      clientId="985961471303-dd7bludfn1fq92rrgto97j2sbnvlhepr.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                    />
                    <Grid container>
                      <Grid item xs>
                        <Link>Forgot password?</Link>
                      </Grid>
                      <Grid item>
                        <Link onClick={redirectSignUp}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              )}
            />

            <Route exact from="/SignUp" render={(props) => <SignUp />} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

//export default withRouter(SignIn);
