import { RootState, useAppDispatch } from '~/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LoadingBanner from './LoadingBanner';
import { getProductList } from '~/components/product/product.slice';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const { productList, loading } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductList({ limit: 8, offset: 0 }));
  }, [dispatch]);

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {!loading &&
          productList.map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                sx={{ height: '400px', margin: '40px auto' }}
                onClick={() => navigate(`product/${item.id}`)}
              >
                <img
                  src={item.images[0]}
                  alt=""
                  className="object-cover w-full h-full cursor-pointer"
                />
              </Box>
            </SwiperSlide>
          ))}
        {loading && (
          <Box sx={{ height: '400px', margin: '40px auto' }}>
            <LoadingBanner></LoadingBanner>
          </Box>
        )}
      </Swiper>
    </>
  );
};

export default Banner;
