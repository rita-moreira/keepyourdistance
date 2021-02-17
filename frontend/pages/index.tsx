import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import MainContent from "../components/MainContent";
import ListTasksCreated from "../components/tasks/ListTasksCreated";
import ListCompletedTasks from "../components/tasks/ListCompletedTasks";
import ListCompletedUserTasks from "../components/tasks/ListCompletedUserTasks";
import { useStyles } from "../theme/theme";
import { aboutContent } from "../fixtures/aboutContent";
import Section from "../components/about/Section";
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: '100vh'
  },

}));

interface StateAuthenticate {
  _id: string;
  username: string;
  email: string;
}

const initialValues = {
  _id: "",
  username: "",
  email: "",
}

const Home: React.FC = () => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const { auth } = useContext(AuthContext);
  const [authenticate, setAuthenticate] = useState<StateAuthenticate>(initialValues);
  useEffect(() => {
    setAuthenticate(auth);
  }, [auth]);
  const renderSections = aboutContent.map((section) => {
    return (
      <div key={section.title} className={classes2.root}>
        <Section
          title={section.title}
          text={section.text}
          video={section.video}
        />
      </div>
    );
  });
  return (
    <div className={`${classes.backgroundColor} ${classes2.root}`} >
      <NavBar />
      {!authenticate ? (
        <div>
          <div className={classes2.root}>
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
