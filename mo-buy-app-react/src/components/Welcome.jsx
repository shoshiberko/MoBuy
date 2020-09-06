import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Fab from "@material-ui/core/Fab";
const styles = (theme) => ({
  centerScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "95vh",
  },

  Logo: {
    fontSize: 70,
    position: "fixed",
    top: "39%",
    left: "49%",
  },
  progress: {
    position: "fixed",
    top: "30%",
    left: "45%",
  },
});

class Welcome extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/SignIn");
    }, 2000); // render for 2 seconds and then push to home
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <PhoneIphoneIcon className={classes.Logo} color="primary" />
        <CircularProgress
          className={classes.progress}
          size={200}
        ></CircularProgress>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Welcome));
