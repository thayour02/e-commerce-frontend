import { Link } from "react-router-dom";
import tayo from "../assets/tayo.webp";
import { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Modal from "./modal";
import { AuthContext } from "../context/authProvider";
import Profile from "./profile";
import useCart from "../hooks";

export default function Navbar() {
  // navbarScroll
  const [isSticky, setSticky] = useState(false);

  const { user } = useContext(AuthContext);
  const [loadUser, setLoadUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadUser(user);
      setLoadingUser(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  const [cart, refetch] = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItem = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <Link to={"/menu"}>All</Link>
            </li>
            <li>
              <Link to={"/menu"}>Salad</Link>
            </li>
            <li>
              <Link to={"/menu"}>Pizza</Link>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Service</summary>
          <ul className="p-2">
          <li>
            <Link to={"/order"}>Order Tracking</Link>
            </li>
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Tabele Booking</a>
            </li>
           
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-10 sm:fixed md:fixed lg:fixed xl:fixed bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100% container mx-auto transition-all duration-300 ease-in-out">
      <div
        className={`navbar  bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100% fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out xl:px-28 ${
          isSticky
            ? "shadow-md  transition-all duration-300 ease-in-out ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItem}
            </ul>
          </div>
          <div>
            <Link
              to="/"
              className="text-xl font-bold  flex
                        items-center "
            >
              <img
                className="w-{40px} h-[40px] rounded-[100%]"
                src={tayo}
                alt=""
              />
              <p className="text-green-700 pt-4 hidden md:block">
                thayour <span className="text-green-200">plc</span>
              </p>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>

        <div className="navbar-end">
          <div className=" display flex  items-center ">
            {/* CartItems */}
            <Link to="cart-page">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart?.length || 0}
                  </span>
                </div>
              </div>
            </Link>
            {/* cart */}

            {/* searchIcon */}
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* LOGIN MODAL  && userProfile*/}
            {loadUser ? (
              <button>
                <Profile user={user} />
              </button>
            ) : (
              <button
                className="btn bg-green-700 rounded-full px-6 text-white flex items-center gap-2"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <FaRegUser size={20} />
                Login
              </button>
            )}
          </div>

          <Modal />
        </div>
      </div>
    </header>
  );
}
