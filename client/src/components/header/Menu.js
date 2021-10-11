import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Menu() {
  const classes = useStyles();
  let history = useHistory();

  const goSigIn = () => {
    reactLocalStorage.remove("token");
    history.push("/signin");
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Videos
          </Typography>
          {/* <Button color="inherit" onClick={goSigIn}>
            LogOut
          </Button> */}
          <Avatar>RO</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
