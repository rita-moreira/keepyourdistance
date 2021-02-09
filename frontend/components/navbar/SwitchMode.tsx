import React, { useContext, useEffect, useState } from "react";

// material ui
import { Switch } from "@material-ui/core";

// theme context
import { ThemeContext } from "../../contexts/ThemeContext";

// actions
import { setCookie } from "../../actions/cookies";

const SwitchMode = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(themeMode !== "light");
    setCookie("theme", themeMode);
  }, [themeMode]);

  // change Theme Mode
  const onchangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <React.Fragment>
      <Switch
        color="primary"
        checked={checked}
        onChange={onchangeTheme}
        name="checkedA"
      />
    </React.Fragment>
  );
};

export default SwitchMode;
