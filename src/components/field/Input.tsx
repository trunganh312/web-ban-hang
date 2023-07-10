import { TextField } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface InputProps {
  control: Control<any>;
  name: string;
  label: string;
  id: string;
  errors: any;
}
const Input = (props: InputProps) => {
  const { name, control, errors } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        autoComplete="email"
        {...field}
        {...props}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </>
  );
};

export default Input;
