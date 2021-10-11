import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  const styles = {
    spinner: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#607d8bb0",
      position: "fixed",
      top: "0px",
      left: "0px",
      zIndex: "999999",
    },
    count: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: "0px",
      zIndex: "99999",
    },
  };
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.spinner}>
      <CircularProgress size="200px" color="secondary" />
      <div style={styles.count}>
        <h1>{(seconds / 100).toFixed(2)}s</h1>
      </div>
    </div>
  );
};

export default Spinner;
