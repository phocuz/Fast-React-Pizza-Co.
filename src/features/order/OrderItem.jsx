import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex justify-between px-6 py-3 font-semibold">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>

      <p className="text-sm capitalize italic text-stone-500">
      {isLoadingIngredients ? 'Loading...' : (ingredients || []).join(', ')}

      </p>
    </li>
  );
}

export default OrderItem;
