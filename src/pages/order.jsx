import { motion } from "framer-motion";
import { useContext, useEffect, useLocation, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../api/apiRequest";
import { Link } from "react-router-dom";

export default function Order() {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("access-token");

  const { refetch, data: orders } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const response = await apiRequest({
        url: `http://localhost:3000/api/get-order?email=${user?.email}`,
        token,
      });
      return response;
    },
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const formatTime = (createdAt) => {
    const time = new Date(createdAt);
    return time.toLocaleTimeString();
  };

  return (
    <div className="pt-20 max-w-screen-2xl xl:px-24 px-10 ">
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "tween",
          stiffness: 100,
        }}
        className="flex flex-col justify-center items-center gap-8"
      >
        {/* text */}
        <div className="text-center">
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.5,
              delay: 0.25,
              type: "tween",
              stiffness: 100,
            }}
            className="pt-10 mb-10 md:text-5xl text-4xl font-bold md:leading-snug leading-snug"
          >
            Track Your
            <span className="text-green-600"> Orders</span>
          </motion.h1>
        </div>
      </motion.div>

      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead className="bg-green-500 text-white  rounded-sm">
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Transaction</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>Order Time</th>
            </tr>
          </thead>
          {/* row 1 */}

          {/* row 2 */}
          {orders?.length > 0 ? (
            orders?.map((items, i) => (
              <tbody key={i}>
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <p>{formatDate(items.createdAt)}</p>
                    </div>
                  </td>
                  <td className="font-medium">{items?.transactionId}</td>

                  <td className="font-medium">{items?.price}</td>
                  <td className="font-medium">{items?.status}</td>
                  <td className="font-medium text-red-400">
                    <Link to="/contact">contact</Link>
                  </td>
                  <td className="font-medium text-red-400">
                    <Link to="/contact">{formatTime(items.createdAt)}</Link>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr className="">
                <td className=" items-center flex text-2xl">
                  No items in yur cart{" "}
                  <Link to="/menu" className="underline text-blue-300">
                    Add to cart
                  </Link>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* {customer details} */}
      <div className="flex my-12 md:flex-row flex-col  justify-between items-start">
        <div className="w-1/2 space-y-3">
          <h3 className="font-bold text-xl">Customer Details</h3>
          <p>
            Name:<span className="font-medium italic">{user?.displayName}</span>
          </p>
          <p>
            Email:<span className="font-medium italic">{user?.email}</span>
          </p>
          <p>
            user.Id:<span className="font-medium italic">{user.uid}</span>
          </p>
        </div>

        <div className="w-1/2 space-y-3 mt-4 md:mt-0">
          <h3 className="font-bold text-xl">Shopping Details</h3>
          {/* <p>Total Item:<span className="font-medium">{cart?.length}</span></p> */}
          {/* <p>Total Price:<span className="font-medium">${totalPrice?.toFixed(2)}</span></p> */}

          <Link to={"/menu"}>
            <button className="bg-green-300 btn">Menu</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
