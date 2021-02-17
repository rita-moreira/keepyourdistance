import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import NavBar from '../components/navbar/NavBar';
import TimeLine from '../components/about/TimeLine';
import Section from '../components/about/Section';
import { useStyles } from '../theme/theme';
import { aboutContent } from '../fixtures/aboutContent';


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: '100vh'
  },
  text: {
    width: '50%',
    margin: 'auto',
    marginTop: '10%',
    textAlign: 'center',
  },

}));

const text = "Due to this pandemic, we spend a lot of time indoors so it often becomes boring because we don't know how to occupy the time. This website offers you lots of ways to spend your day, be productive and still interact with other users. ";
const About: React.FC = () => {
  const classes = useStyles();
  const classes2 = useStylesPage();

  const renderSections = aboutContent.map((section) => (
    <div key={section.title} className={classes2.root}>
      <Section
        title={section.title}
        text={section.text}
        video={section.video}
      />
      ;
    </div>
  ));
  return (
    <div className={classes.backgroundColor}>
      <div className={classes2.root}>
        <NavBar />

        <Typography
          variant="h4"
          color="secondary"
          className={classes2.text}
        >
          {text}
        </Typography>

        <TimeLine />
      </div>
      <div className={classes2.root}>{renderSections}</div>
    </div>
  );
};

export default About;
