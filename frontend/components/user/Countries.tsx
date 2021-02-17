import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import Select, { Theme } from 'react-select';
import { makeStyles, createStyles } from '@material-ui/core';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  font: {
    fontFamily: 'roboto'
  },

}));


type OptionType = {
  value: string;
  label: string;
};

interface CountriesProps {
  handleCountryValue: (value: string) => any;
  defaultValue: any;
}

const Countries: React.FC<CountriesProps> = ({
  handleCountryValue,
  defaultValue,
}: CountriesProps) => {
  const classes2 = useStylesPage();
  const [value, setValue] = useState(defaultValue);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: OptionType) => {
    setValue(value.label);
    handleCountryValue(value.label);
  };

  return (

    <Select
      options={options}
      value={value}
      className={classes2.font}
      onChange={changeHandler}
    />

  );
};

export default Countries;
