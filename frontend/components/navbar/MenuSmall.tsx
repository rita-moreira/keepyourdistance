import React from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { isAuth } from '../../actions/cookies';

const useStyles = makeStyles((theme: Theme) => createStyles({
  MenuItem: {
    backgroundColor: 'white',
    color: '#1F2634',
    fontFamily: 'GothamPro-Bold',
  },
  color: {
    color: '#1F2634'
  }
}));

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
    <>
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
            className={classes.color}
          >
            PROFILE
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.MenuItem}>
          <Link href="/about" className={classes.color}>
            ABOUT
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuSmall;
