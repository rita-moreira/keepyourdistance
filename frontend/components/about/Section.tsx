import React from "react";

// material ui
import { Card, CardContent, Typography } from "@material-ui/core";

interface SectionProps {
  title: string;
  text: string;
  video: string;
}
const Section: React.FC<SectionProps> = ({
  title,
  text,
  video,
}: SectionProps) => {
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
        <Card>
          <CardContent>
            <iframe
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
};

export default Section;
