import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import userApi, { User } from '~/api/userApi';
import { updateProfile } from '~/components/auth/auth.slice';
import Input from '~/components/field/Input';
import InputPassword from '~/components/field/InputPassword';
import { RootState, useAppDispatch } from '~/store';
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
});
const ProfilePage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      password: user?.password,
    });
  }, [reset, user]);
  const handleUpdateUser = async (value: Pick<User, 'name' | 'email' | 'password' | 'id'>) => {
    const newData = {
      ...value,
      name: value.name,
      id: user?.id,
    };
    const result = await userApi.updateUser(newData);
    dispatch(updateProfile(result));
  };

  return (
    <Box
      className="flex flex-col items-center gap-4 p-10 m-auto"
      onSubmit={handleSubmit(handleUpdateUser)}
      component="form"
      sx={{ width: '500px' }}
    >
      <h1 className="text-4xl font-bold text-center">PROFILE</h1>

      <Box className="relative">
        <input
          type="file"
          name="avatar"
          className="absolute h-full cursor-pointer w-[150px] opacity-0 z-50"
        />
        <Avatar alt="Remy Sharp" src={user?.avatar} sx={{ width: 150, height: 150 }}></Avatar>
      </Box>
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
          'Update'
        )}
      </button>
    </Box>
  );
};

export default ProfilePage;
