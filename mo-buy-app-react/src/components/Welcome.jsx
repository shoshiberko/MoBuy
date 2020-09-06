import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
/*const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centerScreen: {
    display: flex,
    flexDirection: column,
    justifyContent: center,
    alignItems: center,
    textAlign: center,
    minHeight: "100vh",
  },
}));

export default function Welcome() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container component="main" className={classes.root}>
      <CircularProgress size={150} />
    </Grid>
  );
}*/

class Welcome extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/SignIn");
    }, 2000); // render for 2 seconds and then push to home
  }
  render() {
    return (
      <Grid container /*component="main" className={classes.root}*/>
        <CircularProgress size={150} />
        <PhoneIphoneIcon />
      </Grid>
    );
  }
}

export default withRouter(Welcome);
