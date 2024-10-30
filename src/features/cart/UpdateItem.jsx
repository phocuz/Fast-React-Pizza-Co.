import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice"

function UpdateItem({pizzaId, currentQuantity}) {
    const dispatch = useDispatch();
    return (
        <div>
            <Button type='round' onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <span className="px-2 text-sm">{currentQuantity}</span>
            <Button type='round'  onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItem
