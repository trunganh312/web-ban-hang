import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '../field/Input';
import InputPassword from '../field/InputPassword';
import { useAppDispatch } from '~/store';
import { toast } from 'react-toastify';
import { register } from '../auth/auth.slice';
const schema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .min(6, 'Your password must be at least 6 characters or greater')
    .required('Please enter your password'),
  retypePassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

type FormData = {
  email: string;
  password: string;
  retypePassword: string;
};

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onSubmitHandler = async (values: FormData) => {
    const newValues = { ...values, avatar: 'https://picsum.photos/200/300' };
    await dispatch(register(newValues))
      .unwrap()
      .then(() => {
        reset({
          email: '',
          password: '',
          name: '',
          retypePassword: '',
        });
        navigate('/sign-in');
        toast.success('Register successfully', { pauseOnHover: false });
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmitHandler)}>
        <Input name="name" label="Username" control={control} id="name" errors={errors}></Input>
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
        <InputPassword
          name="retypePassword"
          label="Retype Password"
          control={control}
          id="retypePassword"
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
            'Sign up'
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
              <Link onClick={() => navigate('/sign-in')} variant="body2">
                Already have an account? Sign in
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
