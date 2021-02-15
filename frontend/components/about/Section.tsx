import React from "react";

// material ui
import { Typography } from "@material-ui/core";

const Section: React.FC<any> = ({
  title,
  text,
  video,
}: {
  title: string;
  text: string;
  video: string;
}) => {
  return (
    <div style={{ padding: "50px" }}>
      <Typography variant="h3" color="secondary">
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        style={{ width: "50%", marginTop: "20px" }}
      >
        {text}
      </Typography>
      <div style={{ marginLeft: "25%", marginTop: "100px" }}>
        <iframe
          width="1000px"
          height="500px"
          src={video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          type="video/mp4"
        />
      </div>
    </div>
  );
};

export default Section;
