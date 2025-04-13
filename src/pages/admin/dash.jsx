import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { FaTrash, FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authProvider";
import { FaUsers, FaRegUser } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";

export default function DashBoard() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const user = await apiRequest({
        url: `/get-user`,
        method: "GET",
        token: token,
      });
      return user;
    },
  });

  const { data: menu = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const menuItem = await apiRequest({
        url: `/menus`,
        method: "GET",
      });
      return menuItem;
    },
  });

  const { data: payment = [] } = useQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const total = await apiRequest({
        url: "/get-revenue",
        method: "GET",
        token
      });
      return total;
    },
  });

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const response = await apiRequest({
        url: `http://localhost:3000/api/get-order?email=${user?.email}`,
        token,
      });
      return response;
    },
  });

  return (
    <div className="bg-green-100 w-screen h-screen">
      <div className="p-14">
        <h1 className="font-bold text-3xl pt-6">
          Hello👋, {user?.displayName}
        </h1>
      </div>
      <div className=" px-10 pt-2 ">
        <div className="stats md:-mx-8 stats-vertical md:stats-horizontal lg:stats-horizontal mx-10 shadow h-30">
          <div className="stat place-items-center  bg-purple-500 w-[200px]">
            <div className="stat-title text-sm font-semibold">Revenue</div>
            <div className="stat-value">${payment?.totalPrice}</div>
            <div className="stat-desc">Jan 1st to Feb 1st</div>
          </div>

          <div className="stat place-items-center lg:flex justify-between  bg-yellow-100 w-[200px]">
            <div>
              <div className="stat-title text-sm font-semibold">Users</div>
              <div className="stat-value text-secondary">
                {users?.users?.length}
              </div>
              <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div>
              <FaUsers size={25} />
            </div>
          </div>

          <div className="stat place-items-center flex justify-between  bg-blue-100 w-[200px]">
            <div>
              <div className="stat-title text-sm font-semibold">
                Manage Items
              </div>
              <div className="stat-value">{menu?.menus?.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div>
              <FaBook size={20} />
            </div>
          </div>

          <div className="stat place-items-center flex justify-between  bg-gray-100 w-[200px]">
            <div>
              <div className="stat-title text-sm font-semibold">Orders</div>
              <div className="stat-value">{orders?.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div>
              <MdOutlineInventory2 size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
