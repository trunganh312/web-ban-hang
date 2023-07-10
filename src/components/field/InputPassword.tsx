import { VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import { InputProps } from './Input';
import { useController } from 'react-hook-form';
const InputPassword = (props: InputProps) => {
  const { name, control, errors } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined" error={!!errors[name]}>
      <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
      <OutlinedInput
        {...props}
        {...field}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="component-error-text">{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default InputPassword;
