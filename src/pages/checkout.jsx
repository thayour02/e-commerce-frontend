import  CheckoutForm from "./checkoutform"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import useCart from "../hooks";



const stripePromise = loadStripe(import.meta.env.VITE_Stipe_PK);

export default function CheckOut() {
    const [ cart ] = useCart()
     const calculatePrice = (items) => {
        return items.price * items.quantity
    }
    const subCartTotalPrice = cart?.reduce((total, items) => {
        return total + calculatePrice(items)
    }, 0)
    
    const totalPrice = parseFloat(subCartTotalPrice.toFixed(2))
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 pt-40">
            <Elements stripe={stripePromise}>
                <CheckoutForm price={totalPrice} cart={cart} />
            </Elements>
        </div>
    )
}