import { Skeleton } from '@mui/material';

const ProductCategoryLoading = () => {
  return <Skeleton sx={{ margin: '10px auto' }} variant="rectangular" width={260} height={30} />;
};

export default ProductCategoryLoading;
