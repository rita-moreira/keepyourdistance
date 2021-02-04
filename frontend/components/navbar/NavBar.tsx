import React, { useContext } from "react";

// ------------ material ui
import { Container, Grid } from "@material-ui/core";

// ------------ components
import Logo from "../individual/Logo";
import LogButton from "./LogButton";
import SwitchMode from "./SwitchMode";
import MenuSmall from "./MenuSmall";

// context auth
import { AuthContext } from "../../contexts/AuthContext";

const NavBar: React.FC = () => {
  const { auth } = useContext(AuthContext);

  // // window size
  // const [windowSize, setWindowSize] = useState<number>(null);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowSize(window.innerWidth);
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [windowSize]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={7}>
          <Logo />
        </Grid>
        <Grid item xs={1}>
          <SwitchMode />
        </Grid>
        <Grid item xs={1}>
          {auth ? <MenuSmall /> : null}
        </Grid>
        <Grid item xs={3}>
          <LogButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NavBar;
