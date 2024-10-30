
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
import { getCurrentQuantityById } from './cartSlice';
import DeleteCartItem from './DeleteCartItem';
import UpdateItem from './UpdateItem';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const  currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItem pizzaId={pizzaId} currentQuantity={currentQuantity}/>
       <DeleteCartItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
