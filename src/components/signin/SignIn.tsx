import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAppDispatch } from '~/store';
import { login } from '../auth/auth.slice';
import Input from '../field/Input';
import InputPassword from '../field/InputPassword';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(6, 'Your password must be at least 6 characters or greater')
    .required('Please enter your password'),
});

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (values: FormData) => {
    await dispatch(login(values))
      .unwrap()
      .then(() => {
        reset({
          email: '',
          password: '',
        });
        navigate('/');
        toast.success('Login successfully', { pauseOnHover: false });
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          name="email"
          label="Email Address"
          control={control}
          id="email"
          errors={errors}
        ></Input>
        <InputPassword
          name="password"
          label="Password"
          control={control}
          id="password"
          errors={errors}
        ></InputPassword>
        <button
          type="submit"
          className={`inline-flex items-center justify-center w-full px-10 mt-2 text-white bg-blue-500 rounded-lg h-14 gap-x-3 cursor-pointer ${
            isSubmitting && 'disabled:cursor-not-allowed disabled:opacity-70'
          }`}
          aria-label="button-loading"
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
              <span>Loading...</span>
            </>
          ) : (
            'Sign in'
          )}
        </button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <span style={{ cursor: 'pointer' }}>
              <Link onClick={() => navigate('/sign-up')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </span>
          </Grid>
        </Grid>
        <Button variant="outlined" color="primary" sx={{ mt: 1 }} onClick={() => navigate('/')}>
          Back to home
        </Button>
      </Box>
    </>
  );
}
