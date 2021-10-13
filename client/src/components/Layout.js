import { Container, CssBaseline, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import VideoList from "./videos/videoList";

const layoutStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
  },
}));

const Layout = () => {
  const classes = layoutStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container className={classes.container}>
          <BrowserRouter>
            <Route path="/" component={VideoList} />
          </BrowserRouter>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
