import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};
const Countries: React.FC<any> = ({
  handleCountryValue,
  defaultValue,
}: any) => {
  const [value, setValue] = useState(defaultValue);
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value: OptionType) => {
    setValue(value.label);
    handleCountryValue(value.label);
  };

  return (
    <div>
      <Select
        options={options}
        value={value}
        style={{ fontFamily: "roboto" }}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Countries;
