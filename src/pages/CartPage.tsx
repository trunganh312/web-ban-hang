import CartList from '~/components/cart/CartList';

const CartPage = () => {
  return (
    <div className="flex flex-col min-h-[285px] gap-5 p-1 xl:p-10 md:p-5">
      <CartList></CartList>
    </div>
  );
};

export default CartPage;
