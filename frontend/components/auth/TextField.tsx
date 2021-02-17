import React, { useState } from 'react';

import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface TextFieldProps {
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextFieldInput: React.FC<TextFieldProps> = ({
  name,
  placeholder,
  value,
  type,
  onChange,
}: TextFieldProps) => {


  const [showPassword, setShowPassword] = useState<boolean>(false);
  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // custom style
  const inputPropsPassword = {
    style: { color: 'grey', fontFamily: 'GothamPro-Bold' },
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };
  const inputProps = {
    style: { color: 'grey' },
  };
  return (
    <>
      <TextField
        InputLabelProps={{
          style: { color: '#D58643' },
        }}
        InputProps={
          name !== 'password' && name !== 'confirmPassword'
            ? inputProps
            : inputPropsPassword
        }
        variant="outlined"
        color="primary"
        value={value}
        name={name}
        label={placeholder}
        required
        placeholder={placeholder}
        type={
          name !== 'password' && name !== 'confirmPassword'
            ? type
            : showPassword
              ? 'text'
              : 'password'
        }
        fullWidth
        onChange={onChange}
      />
    </>
  );
};

export default TextFieldInput;
