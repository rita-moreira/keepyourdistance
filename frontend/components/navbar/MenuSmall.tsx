import React from "react";

// material ui
import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Link,
} from "@material-ui/core";
// menu icon
import MenuIcon from "@material-ui/icons/Menu";

// actions
import { isAuth } from "../../actions/cookies";

// custom style menu dropdown
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    MenuItem: {
      backgroundColor: "white",
      color: "#1F2634",
      fontFamily: "GothamPro-Bold",
    },
  })
);

const MenuSmall: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton color="primary" onClick={handleClick}>
        <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className={classes.MenuItem}>
          <Link
            href={`/profile/${isAuth()?.username}`}
            style={{ color: "#1F2634" }}
          >
            PROFILE
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.MenuItem}>
          <Link href={"/about"} style={{ color: "#1F2634" }}>
            ABOUT
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuSmall;
