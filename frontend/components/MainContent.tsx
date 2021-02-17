import React, { useMemo } from 'react';
import {
  Container, Typography, Grid, Button, createStyles, makeStyles, Theme,
} from '@material-ui/core';
import { API_BASE_URL } from '../config';
import { useStyles } from '../theme/theme';
import { getUsers } from '../actions/user';
import Loading from './individual/Loading';
import { measures } from "../fixtures/mainText"

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  alignRight: {
    textAlign: 'right'
  },
  alignLeft: {
    textAlign: 'left'
  },
  container: {
    marginTop: '15%',
  },
  grid: {
    textAlign: 'center'
  },
  measures: {
    marginTop: '40px'
  }

}));

const MainContent: React.FC = () => {
  const classes = useStyles();
  const classes2 = useStylesPage();

  const { data } = getUsers(`${API_BASE_URL}/api/users`);

  interface StateCountries {
    _id: string;
    country: string
  }
  const countries = data ?
    data.map((item: StateCountries) => item.country)
      .filter((x: string, i: number, a: string[]) => a.indexOf(x) === i) : <Loading />;


  const renderMeasures = useMemo(() =>
    measures.map((measure, id) => {
      if (data) {
        return (
          <Grid container item xs={12} spacing={3} key={measure.text1}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes2.alignRight}>
                {measure.text1}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" className={classes2.alignLeft}>
                {measure.text2} {id === 2 ? null : id === 0 ? data.length + measure.text3 : countries.length + measure.text3}
              </Typography>
            </Grid>
          </Grid>
        )
      } else {
        return null
      }
    }), [data]);

  return (
    <Container
      maxWidth="lg"
      className={classes2.container}
    >
      <Grid
        container
        spacing={3}
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes2.grid}
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
            className={classes2.measures}
          >
            Measures
            </Typography>
        </Grid>

      </Grid>
      {renderMeasures}
    </Container>

  );
};

export default MainContent;
