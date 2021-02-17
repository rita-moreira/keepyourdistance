import React, { memo } from 'react';
import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '50px'
  },
  text: {
    width: '50%', marginTop: '20px'
  },
  card: {
    marginLeft: '25%', marginTop: '100px'
  }
}));

interface SectionProps {
  title: string;
  text: string;
  video: string;
}
const Section: React.FC<SectionProps> = ({ title, text, video, }: SectionProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" color="secondary">
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        className={classes.text}
      >
        {text}
      </Typography>
      <div className={classes.card}>
        <Card>
          <CardContent>
            <iframe
              title={video}
              width="100%"
              height="500px"
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default memo(Section);
