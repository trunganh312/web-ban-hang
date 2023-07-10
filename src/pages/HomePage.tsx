import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from '~/components/auth/auth.slice';
import Banner from '~/modules/HomePage/Banner/Banner';
import ProductLayout from '~/modules/HomePage/ProductList/ProductLayout';
import { RootState, useAppDispatch } from '~/store';

const HomePage = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);
  return (
    <Container>
      <Banner></Banner>
      <ProductLayout></ProductLayout>
    </Container>
  );
};

export default HomePage;
