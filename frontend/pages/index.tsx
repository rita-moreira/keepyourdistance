import React, { useContext, useEffect, useState } from "react";

// components
import NavBar from "../components/navbar/NavBar";
import MainContent from "../components/MainContent";
import ListTasksCreated from "../components/tasks/ListTasksCreated";
import ListCompletedTasks from "../components/tasks/ListCompletedTasks";
import ListCompletedUserTasks from "../components/tasks/ListCompletedUserTasks";

// custom style
import { useStyles } from "../theme/theme";

import { aboutContent } from "../stores/aboutContent";
import Section from "../components/about/Section";
import { AuthContext } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const [authenticate, setAuthenticate] = useState(null);
  useEffect(() => {
    setAuthenticate(auth);
  }, [auth]);
  const renderSections = aboutContent.map((section) => {
    return (
      <div key={section.title} style={{ minHeight: "100vh" }}>
        <Section
          title={section.title}
          text={section.text}
          video={section.video}
        />
      </div>
    );
  });
  return (
    <div className={classes.backgroundColor} style={{ minHeight: "100vh" }}>
      <NavBar />
      {!authenticate ? (
        <div>
          <div style={{ minHeight: "100vh" }}>
            <MainContent />
          </div>
          {renderSections}
        </div>
      ) : (
        <div>
          <ListTasksCreated />
          <ListCompletedTasks />
          <ListCompletedUserTasks />
        </div>
      )}
    </div>
  );
};
export default Home;
