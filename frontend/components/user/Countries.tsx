import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

const Countries: React.FC<any> = ({ handleCountryValue }: any) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value: any) => {
    setValue(value);
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
