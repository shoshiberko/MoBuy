import React from "react";
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

const useStyles = makeStyles(theme => ({
  DialogAction: {
    length: 30,
    width: 70
  },
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const responseFacebook = response => {
    console.log(response);
  };

  const responseGoogle = response => {
    console.log(response);
  };

  const onChangeEmailHandler = e => setEmail(e.target.value);
  const onChangePasswordHandler = e => setPassword(e.target.value);

  function submitHandler(e) {
    //var self;

    e.preventDefault();
    //self = this;

    //console.log(this.state);

    var data = {
      emailAddress: email,
      password: password
    };

    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/SignIn",
      data: data
    })
      .done(function(data) {
        sessionStorage.setItem("userEmail", email);
      })
      .fail(function(jqXhr) {
        alert("Try again!!");
      });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth="true">
        <DialogActions className={classes.DialogAction}>
          <IconButton
            component="a"
            href="/"
            onClick={handleClose}
            color="primary"
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={8}
              square
            >
              <div className={classes.paper}>
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
                    onChange={onChangeEmailHandler}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangePasswordHandler}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
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
                      <Link component="a" href="/SignUp">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
