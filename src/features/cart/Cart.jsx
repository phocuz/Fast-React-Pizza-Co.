import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getUserName } from './cartSlice';
import Button from '../../ui/Button';
import EmptyCart from  "./EmptyCart"


function Cart() {
  const cart = useSelector(getCart);
const dispatch =useDispatch();
  const username = useSelector(getUserName);

  function handleClearCart (){
    dispatch(clearCart()
  );
  }

  if(!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className='text-blue-500 text-xl'>&larr; Back to menu</Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {cart.map(item => <CartItem item={item} key={item.pizzaId}/>)}

      <div className="mt-6 space-x-2">
        <Link to="/order/new" className='inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-6 py-3'>
          Order pizzas
        </Link>

        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;

