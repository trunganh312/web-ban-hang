import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCategory from './ProductCategory';
import ProductList from './ProductList';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ProductLayout = () => {
  const [value, setValue] = React.useState(0);
  const handleChangeCategory = (value: number) => {
    setValue(value);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={3}>
          <Item>
            <ProductCategory onChange={handleChangeCategory}></ProductCategory>
          </Item>
        </Grid>
        <Grid item md={8} lg={9}>
          <ProductList value={value}></ProductList>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductLayout;
