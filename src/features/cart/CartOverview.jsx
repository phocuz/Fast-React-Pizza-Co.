import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity,getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {

  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const getTotalCart = useSelector(getTotalCartPrice);

      if(!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 sm:px-6 text-sm md:text-2xl py-6  flex items-center justify-between ">
      <p className="text-stone-300 font-semibold  space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(getTotalCart)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;