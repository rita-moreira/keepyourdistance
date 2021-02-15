import React from "react";

// components
import NavBar from "../components/navbar/NavBar";
import TimeLine from "../components/about/TimeLine";
import Section from "../components/about/Section";
// theme
import { useStyles } from "../theme/theme";
import { Typography } from "@material-ui/core";
// store
import { aboutContent } from "../stores/aboutContent";

const text =
  "Due to this pandemic, we spend a lot of time indoors so it often becomes boring because we don't know how to occupy the time. This website offers you lots of ways to spend your day, be productive and still interact with other users. ";
const About: React.FC = () => {
  const classes = useStyles();

  const renderSections = aboutContent.map((section) => {
    return (
      <div key={section.title} style={{ minHeight: "100vh" }}>
        <Section
          title={section.title}
          text={section.text}
          video={section.video}
        />
        ;
      </div>
    );
  });
  return (
    <div className={classes.backgroundColor}>
      <div style={{ minHeight: "100vh" }}>
        <NavBar />

        <Typography
          variant="h4"
          color="secondary"
          style={{
            width: "50%",
            margin: "auto",
            marginTop: "10%",
            textAlign: "center",
          }}
        >
          {text}
        </Typography>

        <TimeLine />
      </div>
      <div style={{ minHeight: "100vh" }}>{renderSections}</div>
    </div>
  );
};

export default About;
