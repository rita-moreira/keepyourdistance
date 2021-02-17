import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles(() => ({
  text: {
    color: '#EF7D1D',
    fontFamily: 'GothamPro-Bold',
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'black',
    textAlign: 'left',
    width: '100%',
    marginTop: '2px',
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: '#495869',
    textAlign: 'left',
    width: '100%',
  },
}));

export const TimeLine: React.FC = () => {
  const classes = styles();
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}>
          JOIN KEEP YOUR DISTANCE
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}>
          COMPLETE TASKS
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}>
          SHARE EXPERIENCES
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent className={classes.text}>
          CHALLENGE OTHER USERS
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimeLine;
