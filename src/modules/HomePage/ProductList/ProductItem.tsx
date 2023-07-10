import { Box } from '@mui/material';
import { ProductItemType } from '~/types/product.type';

interface CardProps {
  product: ProductItemType;
  onNavigate: () => void;
}

const ProductItem = ({ product, onNavigate }: CardProps) => {
  const handleNavigate = (): void => {
    onNavigate();
  };
  return (
    <Box
      onClick={handleNavigate}
      sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
    >
      <div
        aria-label="card-item-v1"
        className="flex flex-col p-2 rounded-lg shadow-lg cursor-pointer sm:w-[600px]  lg:w-[200px] md:w-[200px]"
      >
        <div className="relative flex-shrink-0 mb-5 h-[250px]">
          <img src={product.images[0]} alt="" className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h3 className="mb-3 text-lg font-bold">{product.title}</h3>
          <div className="flex justify-between text-gray-400">
            <span>{product.price}$</span>
            <button className="p-2 text-sm text-white bg-green-500 rounded-lg">Mua ngay</button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductItem;
