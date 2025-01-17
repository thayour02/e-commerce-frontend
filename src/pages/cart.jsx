import { Link } from "react-router-dom"
// import '../../src/App.css'
import { motion } from "framer-motion"
import useCart from "../hooks/index"
import { FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import { apiRequest } from "../api/apiRequest"
import { useContext, useLocation, useState } from "react"
import { AuthContext } from "../context/authProvider"

export default function CartItems() {
    const [cart, refetch] = useCart()
    const [cartItems, setCartItems] = useState([])
    const { user } = useContext(AuthContext)


    console.log(cart)
    const handleDelete = async (items) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                const dele = await apiRequest({
                    url: `/carts/${items._id}?email=${user?.email}`,
                    method: "DELETE",
                    token: user?.token
                });
                if (dele?.success === true) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleIncrease = (items) => {
        try {
            const item = apiRequest({
                url: `/carts/${items._id}`,
                method: "PUT",
                data: { quantity: items.quantity + 1 }
            })
            const updatedCart = cartItems.map((cartItems) => {
                if (cartItems.id === items.id) {
                    return {
                        ...cartItems,
                        quantity: cartItems.quantity + 1
                    }
                }
                return cartItems;
            })
            setCartItems(updatedCart)
            refetch()

        } catch (error) {
            return error.message
        }
    }

    const handleDecrease = (items) => {
        try {
            if (items.quantity > 1) {
                const item = apiRequest({
                    url: `/carts/${items._id}`,
                    method: "PUT",
                    data: { quantity: items.quantity - 1 }
                })
                const updatedCart = cartItems.map((cartItems) => {
                    if (cartItems.id === items.id) {
                        return {
                            ...cartItems,
                            quantity: cartItems.quantity - 1
                        }
                    }
                    return cartItems;
                })
                setCartItems(updatedCart)
                refetch()

            } else {
                alert("items quantity can't be less the a quantity")
            }
        } catch (error) {
            return error.message
        }
    }

    const calculatePrice = (items) => {
        return items.price * items.quantity
    }
    const subCartTotalPrice = cart?.reduce((total, items) => {
        return total + calculatePrice(items)
    }, 0)
    const totalPrice = subCartTotalPrice || 0;
    
    return (
        <div className="pt-20 max-w-screen-2xl xl:px-24 px-10 px-4">
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: 75 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                className="flex flex-col justify-center items-center gap-8">
                {/* text */}
                <div className="text-center">
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: -75 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                        className="pt-10 mb-10 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Items in Your
                        <span className="text-green-600"> Food Cart</span>
                    </motion.h1>

                </div>
            </motion.div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-green-500 text-white  rounded-sm">
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* row 1 */}

                    {/* row 2 */}
                    {
                        cart?.length > 0 ? (
                            cart?.map((items, i) => (
                                <tbody key={i}>
                                    <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={items.image}
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium">
                                                {items.name}
                                            </td>
                                            {/* <td>{items.quantity}</td> */}
                                            <button className="btn btn-xs mt-4" onClick={() => handleDecrease(items)}>-</button>
                                            <input type="number"
                                                value={items.quantity}
                                                onChange={() => console.log(items.quantity)}
                                                className="w-10 mx-2 text-center overflow-hidden appearance-none" />
                                            <button className="btn btn-xs mt-4" onClick={() => (handleIncrease(items))}>+</button>
                                            <td>${calculatePrice(items).toFixed(2)}</td>
    
                                            <th>
                                                <button className="btn btn-ghost btn-xs " onClick={() => handleDelete(items)}>
                                                    <FaTrash color="red" size={16} />
                                                </button>
                                            </th>
                                        </tr>
                                </tbody>
                        ))
                    ): <tbody >
                            <tr className="">
                                <td className="">No items in yur cart <Link to='/menu' className="underline text-blue-300">Add to cart</Link></td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>


            {/* {customer details} */}
            <div className="flex my-12 md:flex-row flex-col  justify-between items-start">
                <div className="w-1/2 space-y-3">
                    <h3 className="font-bold text-xl">Customer Details</h3>
                    <p>Name:<span className="font-medium italic">{user?.displayName}</span></p>
                    <p>Email:<span className="font-medium italic">{user?.email}</span></p>
                    <p>user.Id:<span className="font-medium italic">{user.uid}</span></p>
                </div>

                <div className="w-1/2 space-y-3 mt-4 md:mt-0">
                    <h3 className="font-bold text-xl">Shopping Details</h3>
                    <p>Total Item:<span className="font-medium">{cart?.length}</span></p>
                    <p>Total Price:<span className="font-medium">${totalPrice?.toFixed(2)}</span></p>

                   <Link to={'/checkout'}>
                   <button className="bg-green-300 btn">CheckOut</button>
                   </Link>
                </div>
            </div>
        </div>
    )
}