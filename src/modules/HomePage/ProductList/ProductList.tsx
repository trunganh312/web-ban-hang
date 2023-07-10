import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getProductList, setPage, setProductList } from '~/components/product/product.slice';
import { RootState, useAppDispatch } from '~/store';
import ProductItem from './ProductItem';
import ProductLoading from './ProductLoading';
interface ProductListProp {
  value: number;
}
const ProductList = ({ value }: ProductListProp) => {
  const { productList, loading, page } = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (value > 0) {
      dispatch(getProductList({}))
        .unwrap()
        .then((result) => {
          const newProduct = result?.filter((item: any) => item.category.id === value);
          dispatch(setProductList(newProduct));
        });
    } else if (value === 0) {
      dispatch(getProductList({ offset: 8 * page, limit: 8 }));
    }
  }, [dispatch, page, value]);
  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {loading && (
          <>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
            <ProductLoading></ProductLoading>
          </>
        )}
        {!loading &&
          productList.length > 0 &&
          productList.map((product) => {
            return (
              <ProductItem
                onNavigate={() => {
                  navigate(`/product/${product.id}`);
                }}
                product={product}
                key={product.id}
              ></ProductItem>
            );
          })}
      </div>
      <Pagination
        sx={{ margin: '30px auto 0 auto', display: 'flex', justifyContent: 'center' }}
        count={31}
        variant="outlined"
        color="primary"
        onChange={(e, page) => dispatch(setPage(page - 1))}
      />
    </>
  );
};

export default ProductList;
