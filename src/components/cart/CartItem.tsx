import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useAppDispatch } from '~/store';
import { ProductItemType } from '~/types/product.type';
import Swal from 'sweetalert2';
import { removeCart, setQuantity } from '../auth/auth.slice';

interface CartItemProp {
  cart: {
    id: number;
    quantity: number;
    product: ProductItemType;
  };
  onNavigate: () => void;
}
const CartItem = ({ cart, onNavigate }: CartItemProp) => {
  const dispatch = useAppDispatch();
  const handleDecrease = () => {
    dispatch(setQuantity({ id: cart.id, quantity: cart.quantity - 1 }));
  };

  const handleIncrease = () => {
    dispatch(setQuantity({ id: cart.id, quantity: cart.quantity + 1 }));
  };

  const handleRemoveCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        dispatch(removeCart(cart.id));
      }
    });
  };
  return (
    <Box>
      <div aria-label="card-horizontal" className="flex items-center cursor-pointer gap-x-5">
        <Box className="flex-shrink-0 w-20 h-20 rounded-lg " onClick={onNavigate}>
          <img
            src={cart.product.images[0]}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </Box>
        <Box className="flex-1" onClick={onNavigate}>
          <h3>{cart.product.title}</h3>
          <p className="text-sm italic font-medium text-gray-300">{cart.product.category.name}</p>
        </Box>
        <span className="text-red-500"> {cart.product.price}$</span>
        <Box onClick={handleRemoveCart}>
          <DeleteIcon></DeleteIcon>
        </Box>
        <div className=" border rounded-lg border-slate-300 w-full max-w-[120px] flex justify-between items-center my-5  overflow-hidden">
          <button className="p-3 bg-green-300" onClick={handleDecrease}>
            -
          </button>
          <span className="text-2xl font-medium">{cart.quantity}</span>
          <button className="p-3 bg-green-300" onClick={handleIncrease}>
            +
          </button>
        </div>
      </div>
    </Box>
  );
};

export default CartItem;
