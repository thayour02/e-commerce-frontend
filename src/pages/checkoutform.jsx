import React, { useState, useContext, useEffect } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { AuthContext } from '../context/authProvider';
import { apiRequest } from '../api/apiRequest';
import { json } from 'react-router-dom';
import Swal from "sweetalert2"


export default function CheckoutForm({ price, cart }) {
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState("")
    const [cardError, setCardError] = useState("")




    useEffect(() => {
        apiRequest({
            url: "/create-payment-intent",
            method: "POST",
            data: { price }
        }).then(res => {
            console.log(res)
        })
    }, [price, apiRequest])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // create card element
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setCardError("success!")
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payement successfully..You've successfully place your order",
                showConfirmButton: false,
                timer: 1500
            });
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email || "unknown"
                    },
                },
            })

    };





    return (
        <div className='flex flex-col  mx-4 md:flex-row justify-start items-start gap-8' >
            {/* checkoutform */}
            <div className='md:w-1/2 w-full space-y-3'>
                <h1 className='font-semibold text-lg'>Order Summary</h1>
                <p>Total Price: ${price}</p>
                <p>Total Cart: {cart?.length}</p>
            </div>


            {/* right */}

            <div className='md:w-1/3 w-full space-y-3 card bg-base-100 
        max-w-sm shrink-0 shadow-2xl px-4 py-8'>
                <h1 className='font-semibold text-lg'>Process Your Payment</h1>
                <p>Credit/Debit card Details</p>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe} className='btn w-full mt-5 bg-green-500 text-white'>
                        Pay
                    </button>
                </form>
                {
                    cardError ? <p className='text-red italics'>{cardError}</p> : ""
                }
                <div className='mt-5 text-center'>
                    <hr />
                    <button className='btn btn-sm mt-5 bg-orange-500 text-white'
                        type='submit' >
                        Pay
                    </button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
