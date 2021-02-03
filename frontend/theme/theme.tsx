import {
  createMuiTheme,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F2634",
    },
    secondary: {
      main: "#5B677E",
    },
    background: {
      default: "#FFFFFF",
    },
    info: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "GothamPro-Bold",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

export const darkTheme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#5B677E",
    },
    background: {
      default: "#1F2634",
    },
    info: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "GothamPro-Bold",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backgroundColor: {
      backgroundColor: theme.palette.background.default,
    },

    primaryButton: {
      fontSize: 16,
      padding: "5px 50px",
      border: "2px solid",
      borderRadius: "12px",
      backgroundColor: theme.palette.background.default,
      textAlign: "center",
      borderColor: theme.palette.primary.main,
      fontFamily: "GothamPro-Bold",
      color: theme.palette.primary.main,

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        color: theme.palette.background.default,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
      },
    },
  })
);

theme.typography.subtitle1 = {
  color: "#B1B1B1",
  fontSize: "16px",
  fontFamily: "roboto",
  textDecoration: "line-through",
  textDecorationThickness: "0.2em",
  textDecorationColor: `${theme.palette.primary.main}90`,
  fontWeight: "bold",
};
darkTheme.typography.subtitle1 = {
  color: "#B1B1B1",
  fontSize: "16px",
  fontFamily: "roboto",
  textDecoration: "line-through",
  textDecorationThickness: "0.2em",
  textDecorationColor: `${theme.palette.primary.main}90`,
  fontWeight: "bold",
};

theme.typography.subtitle2 = {
  color: theme.palette.info.main,
  fontSize: "16px",
  fontFamily: "roboto",
  fontWeight: "bold",
};
darkTheme.typography.subtitle2 = {
  color: darkTheme.palette.info.main,
  fontSize: "16px",
  fontFamily: "roboto",
  fontWeight: "bold",
};

theme.typography.body1 = {
  color: "#FFFFFF",
  fontSize: "16px",
  fontFamily: "roboto",
  width: "60%",
};

darkTheme.typography.body1 = {
  color: "#FFFFFF",
  fontSize: "16px",
  fontFamily: "roboto",
  width: "60%",
};
