import { Box, Grid, Rating } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '~/api/productApi';
import { addCartList } from '~/components/auth/auth.slice';
import { setQuantity } from '~/components/product/product.slice';
import { RootState, useAppDispatch } from '~/store';
import { ProductItemType } from '~/types/product.type';

const ProductDetail = () => {
  const [value, setValue] = React.useState<number | null>(2);
  const [loading, setLoading] = React.useState<boolean | null>(false);
  const [product, setProduct] = React.useState<ProductItemType>();
  const [urlImage, setUrlImage] = React.useState<string>('');
  const { quantity } = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const handleIncrement = () => {
    dispatch(setQuantity(quantity + 1));
  };

  const handleDecrement = () => {
    dispatch(setQuantity(quantity - 1));
  };

  const handleAddCartItem = () => {
    if (token) {
      const newProduct = {
        userId: user?.id,
        id: product?.id,
        product: product,
        quantity: quantity,
      };
      dispatch(addCartList(newProduct));
      dispatch(setQuantity(0));
      toast.success(`Bạn đã thêm ${quantity} sản phẩm vào giỏ hàng thành công'`, {
        pauseOnHover: false,
      });
    } else {
      navigate('/sign-in');
    }
  };
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await productApi.get(Number(id));
      setProduct(result);
      setUrlImage(result.images[0]);
      setLoading(false);
    })();
  }, [id]);

  return (
    <>
      {!loading && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} xl={4}>
              <div
                aria-label="card-item-v1"
                className="flex flex-col w-[350px] cursor-pointer xl:w-full md:w-full  "
              >
                <div className="relative flex-shrink-0 mb-5 h-[450px]">
                  <img src={urlImage} alt="" className="object-cover w-full h-full rounded-lg" />
                </div>
              </div>
              <div className="flex gap-2">
                {product?.images.map((image) => (
                  <Box onClick={() => setUrlImage(image)} key={image}>
                    <div
                      aria-label="card-horizontal"
                      className={`flex items-center cursor-pointer gap-x-5 ${
                        urlImage === image ? 'border-2 border-green-500' : ''
                      } `}
                    >
                      <div className="flex-shrink-0 w-20 h-20 ">
                        <img src={image} alt="" className="object-cover w-full h-full " />
                      </div>
                    </div>
                  </Box>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={8} xl={8}>
              <p className="text-3xl">{product?.title}</p>
              <div className="flex items-center mt-2">
                <span>4.7</span>
                <span>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </span>
              </div>
              <div className="flex gap-5 p-5 mt-1 bg-slate-100">
                <span className="text-2xl italic text-gray-500 line-through">
                  {Number(product?.price) + 150}$
                </span>
                <span className="text-3xl text-red-500"> {product?.price}$</span>
              </div>
              <div className="mt-2 ">
                <p className="mb-2 italic text-red-500">Category: </p>
                <span className="p-2 text-white bg-green-500 rounded-lg cursor-pointer">
                  {product?.category.name}
                </span>
              </div>
              <div className="mt-5 italic text-red-500 ">Description: </div>
              <p>{product?.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="italic text-red-500 ">Số lượng:</span>
                <div className=" border rounded-lg border-slate-300 w-full max-w-[120px] flex justify-between items-center my-5  overflow-hidden">
                  <button className="p-3 bg-green-300" onClick={handleDecrement}>
                    -
                  </button>
                  <span className="text-2xl font-medium">{quantity}</span>
                  <button className="p-3 bg-green-300" onClick={handleIncrement}>
                    +
                  </button>
                </div>
                <button
                  className={`p-3 text-white bg-green-500 rounded-lg ${
                    quantity > 0 ? '' : 'bg-green-100 cursor-not-allowed'
                  }`}
                  disabled={quantity <= 0}
                  onClick={handleAddCartItem}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
      {loading && (
        <div className="flex justify-center h-[205px]">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-purple-200 rounded-full" />
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-purple-700 rounded-full animate-spin" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
