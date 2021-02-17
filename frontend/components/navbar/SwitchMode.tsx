import React, { useContext, useEffect, useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { ThemeContext } from '../../contexts/ThemeContext';
import { setCookie } from '../../actions/cookies';

const SwitchMode = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(themeMode !== 'light');
    setCookie('theme', themeMode);
  }, [themeMode]);

  // change Theme Mode
  const onchangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <FormControlLabel
        control={(
          <Switch
            color="primary"
            checked={checked}
            onChange={onchangeTheme}
            name="checkedA"
          />
        )}
        labelPlacement="start"
        label=" "
      />
    </>
  );
};

export default SwitchMode;
