import { Link, Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaRegUser } from "react-icons/fa6";
import { RiMenuAddLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import tayo from "../assets/tayo.webp";
import { useContext, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdAddLocationAlt } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { AuthContext } from "../context/authProvider";
import Login from "../pages/login";
import { apiRequest } from "../api/apiRequest";
import Home from "../components/home";
import { useQuery } from "@tanstack/react-query";

export default function DashBoardLayout() {
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const off = window.scrollY;
      if (off > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });

  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("logged out");
      })
      .catch((error) => {});
  };
  const shareLinks = (
    <>
      <li>
        <Link to="/">
          <IoHomeOutline />
          Home
        </Link>
      </li>

      <li>
        <Link to="/menu">
          <FaShoppingBag />
          Menu
        </Link>
      </li>
      <li>
        <Link to="/order">
          <MdAddLocationAlt />
          Order Tracking
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <FcCustomerSupport />
          Customer Support
        </Link>
      </li>
    </>
  );
  return (
    <div className="-mt-[640px] min-h-screen max-w-screen-2xl mx-auto ">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center sm:items-start sm:justify-start">
          {/* Page content here */}
          <div
            className={`flex  navbar  justify-between  
                                bg-gradient-to-r  from-[#FAFAFA] to-[#FCFCFC] to-100% 
                                fixed  top-0 left-0 right-2 z-10 md:h-10 transition-all duration-300 
                                ease-in-out px-4
                                ${
                                  isSticky
                                    ? "shadow-md  transition-all duration-300  ease-in-out "
                                    : ""
                                }`}
          >
            <label
              htmlFor="my-drawer-2"
              className="btn bg-green-200 mt-2 md:mt-0  drawer-button lg:hidden"
            >
              <MdSpaceDashboard color="green" />
            </label>
            <button
              className="  bg-green-700  md:mt-0 rounded-full mt-2 text-sm h-10 hover:bg-gray-400 w-24  
                                          mx-4  text-white flex justify-center items-center gap-2  border-none lg:hidden"
              onClick={handleLogOut}
            >
              <FaRegUser size={10} />
              LogOut
            </button>
          </div>
          <div className=" md:-mt-[360px] lg:-mt-20 -mt-40">
            <Outlet />
          </div>
        </div>
        <div
          className="drawer-side mt-24 md:mt-22 lg:mt-0"
          onAnimationStart="slid"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
            <div className="flex justify-between items-center">
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
                <p className="text-green-700 pt-4 ">
                  thayour <span className="text-green-200">plc</span>
                </p>
              </Link>
              <div className="badge bg-green-700 border-none text-white mt-2 mb-3   font-bold">
                admin
              </div>
            </div>
            {/* Sidebar content here */}
            <li className="mt-8">
              <Link to="">
                <MdSpaceDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/booking">
                <FaShoppingBag />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <RiMenuAddLine />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-10">
              <Link to="/dashboard/users">
                <FaUsers />
                User
              </Link>
            </li>

            {shareLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
