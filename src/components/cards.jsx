import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { apiRequest } from "../api/apiRequest";
import { AuthContext } from "../context/authProvider";
import Swal from "sweetalert2";
import useCart from "../hooks";

export default function Card({ item }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathName || "/";
  const { name, quantity, image, price, email, _id } = item;

  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("access-token")

  const handleHeartFilled = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      const cartItem = {
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
        menuItemId: _id,
      };
      const add = await apiRequest({
        url: `/add-to-carts`,
        method: "POST",
        data: cartItem,
        token
      });
      if (add?.success === true) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item Added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: add.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "Please Login",
        text: "You need to sign-up to add product to your cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card h-full bg-base-100 w-[350px] shadow-xl relative ">
      <div
        className={`flex flex-col md:flex-row justify-around 
             items-center right-2 top-2 p-4 heartStar bg-green-600  gap-2 absolute 
             ${isHeartFilled ? "text-rose-600" : "text-white"}`}
        onClick={handleHeartFilled}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link
        to={`/tayo/${item._id}`}
        className="flex items-center justify-center w-full mx-auto"
      >
        <img
          className="p-5 mt-4 rounded-full px-4 w-28 h-28 
                    md:w-full md:h-60 hover:scale-105 transition-all duration-200 "
          src={item.image}
          alt=""
        />
      </Link>
      <div className="card-body ">
        <h2 className="card-title">{item.name}</h2>
        <p className="w-60 truncate">{item.recipe}</p>
        <div className="card-actions justify-between">
          <h5 className="font-semibold mt-4">
            <span className="text-sm text-red-800">$ </span>
            {item.price}
          </h5>
          <button
            className="btn bg-green-600 text-white"
            onClick={() => handleAddToCart(item)}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
