import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { RootState } from '~/store';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const { cartList, user } = useSelector((state: RootState) => state.auth);
  const cartListNew = cartList.filter((item) => item.userId === user?.id);
  const navigate = useNavigate();
  const totalCartUSD = cartList?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <div>
      <div className="flex flex-col gap-6 ">
        {cartListNew?.map((item) => (
          <CartItem key={item.id} cart={item} onNavigate={() => navigate(`/product/${item.id}`)} />
        ))}
        {cartListNew?.length > 0 && (
          <div>
            Tổng cộng: <span className="text-xl font-semibold text-red-500">{totalCartUSD}$</span>
          </div>
        )}
      </div>
      {cartListNew?.length === 0 && <div>Giỏ hàng trống</div>}
    </div>
  );
};

export default CartList;
