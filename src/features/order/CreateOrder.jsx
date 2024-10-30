//import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart"
import Button from "../../ui/Button";
import store from '../../store';
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {

   const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  const {username,status: addressStatus,position,address,error:errorAddress} = useSelector((state) => state.user);

  const isLoadingAddress =addressStatus === 'loading'
  const formErrors = useActionData();

  const totalCartPrice =useSelector(getTotalCartPrice);
  const priorityPrice = withPriority? totalCartPrice * 0.2 :0;
  const totalPrice = totalCartPrice + priorityPrice

  const dispatch = useDispatch();
  
  if(!cart.length) return <EmptyCart />

  return (
    <div className="mx-6 my-6 ">
      <h2 className="mb-4 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
       <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-xl font-bold ">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-xl font-bold">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col relative gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-xl font-bold">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
          </div>
               
        { !position && (<span className=" absolute top-[2px] right-0">
           <Button
          disabled={isLoadingAddress}
           type= "primary" onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress());
          } 
            }>
            Get Postion
          </Button>

          {addressStatus ==='error' && (
              <p className="mt-2 rounded-md absolute bg-red-100 p-2 text-xs text-red-700 ">
                {errorAddress}
              </p>
            )}
         </span>)}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div> 
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
  {isSubmitting ? "Placing order..." : <span>`Order now  for {formatCurrency(totalPrice)}`</span>}
</Button>

        </div>
        <div>
          <input type="hidden" name="cart" value ={JSON.stringify(cart)} />
        </div>
      </Form>
    </div>
  );
}

export async function action ({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //convert the formData to an object.
  

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority=== 'true',
  };

  const errors = {};
  if(!isValidPhone(order.phone))
    errors.phone = "please give us your correct phone number, we might need it to contact you.";

  if(Object.keys(errors).length >0) return errors;


  
const newOrder = await createOrder(order)

store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;