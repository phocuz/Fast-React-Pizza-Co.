
import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice";
function DeleteCartItem({pizzaId}) {
    const dispatch = useDispatch();

   function handleDeleteCartItem (){
        dispatch(deleteItem(pizzaId))
    }
    return (
        <div>
             <Button type='small' onClick={handleDeleteCartItem}>Delete</Button>
        </div>
    )
}

export default DeleteCartItem
