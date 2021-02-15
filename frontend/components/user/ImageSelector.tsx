import { Slider, makeStyles } from "@material-ui/core";
import React from "react";

import { profileImages } from "../../stores/imageStore";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
  },
  gridList: {
    width: 500,
    height: 100,
  },
}));

const ImageSelector = ({ handleProfileValue, defaultValue }: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(
    defaultValue ? defaultValue.match(/\d+/g).map(Number) - 1 : 0
  );

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    handleProfileValue(profileImages[newValue].img);
  };
  return (
    <div className={classes.root}>
      <img
        src={profileImages[value].img}
        style={{ width: "10%", height: "10%" }}
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

export default ImageSelector;
