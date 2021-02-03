import React from "react";

// material ui
import { Container, Typography, Grid, Button } from "@material-ui/core";

// custom theme
import { useStyles } from "../theme/theme";

const measures: { text1: string; text2: string }[] = [
  {
    text1: ".maximum of 10 people per room",
    text2: "Everyone can join, currently we have _____ registered users!",
  },
  {
    text1: ".ban on circulating between municipalities",
    text2: "Allowed to visit the profiles of the users from __ countries!",
  },
  {
    text1: ".compulsory curfew from 13h ",
    text2: "Working 24 hours a day!",
  },
];

const MainContent: React.FC = () => {
  const classes = useStyles();
  const renderMeasures = measures.map((measure) => {
    return (
      <React.Fragment key={measure.text1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={{ textAlign: "right" }}>
              {measure.text1}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" style={{ textAlign: "left" }}>
              {measure.text2}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });
  return (
    <div>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "15%",
        }}
      >
        <Grid
          container
          spacing={3}
          justify="center"
          alignContent="center"
          alignItems="center"
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12}>
            <Typography color="primary" variant="h3">
              KEEP YOUR DISTANCE
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.primaryButton} href="/register">
              JOIN
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="h5"
              style={{ marginTop: "40px" }}
            >
              Measures
            </Typography>
          </Grid>
          {renderMeasures}
        </Grid>
      </Container>
    </div>
  );
};

export default MainContent;
