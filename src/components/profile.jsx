
import { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/authProvider";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/apiRequest";

export default function Profile({ user }) {

  const { logOut } = useContext(AuthContext)

 
  const handleLogOut = () => {
    console.log('logOut')
    logOut().then(() => {
      alert('logged out')
      window.location.reload()
    }).catch((error) => {
      return error
    });
  }
  return (
    <div className="drawer drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost  btn-circle avatar" >
          <div className="w-10 rounded-full text-center">
            {
              user ?
                <img
                  alt=""
                  src={user.photoURL} />
                : < FaRegUserCircle size={30} className="items-center  mt-1 ml-1" />
            }
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><Link to='/update-profile'>Profle</Link></li>
          <li><a>Order</a></li>
          <li><a>Setting</a></li>
          {
            user?.role === 'admin' ? <li><Link to='/dashboard'>Admin Dashboard</Link></li>
              : ""
          }
          <li><a onClick={handleLogOut}>LogOut</a></li>

        </ul>
      </div>
    </div>
  )
}