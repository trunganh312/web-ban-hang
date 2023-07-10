import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ProductLoading = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton variant="rectangular" width={200} height={270} />
    </Box>
  );
};

export default ProductLoading;
