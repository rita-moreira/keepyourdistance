import { Slider, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';

import { profileImages } from '../../fixtures/imageStore';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  gridList: {
    width: 500,
    height: 100,
  },
  img: {
    width: '10%', height: '10%'
  }
}));

interface ImageSelectorProps {
  handleProfileValue: any;
  defaultValue: any;
}
const ImageSelector: React.FC<ImageSelectorProps> = ({ handleProfileValue, defaultValue }: ImageSelectorProps) => {

  console.log(defaultValue)
  const classes = useStyles();
  const [value, setValue] = React.useState(
    defaultValue ? defaultValue.match(/\d+/g).map(Number) - 1 : 0,
  );

  const handleChange = (e: React.ChangeEvent<{}>, newValue: any) => {

    setValue(newValue);
    handleProfileValue(profileImages[newValue].img);

  };
  return (
    <div className={classes.root}>
      <img
        src={profileImages[value].img}
        className={classes.img}
        alt="profile"
      />
      <Slider
        color="secondary"
        value={value}
        min={0}
        step={1}
        max={30}
        onChange={handleChange}
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
};

export default memo(ImageSelector);
