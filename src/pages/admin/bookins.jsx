import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { FaMarker, FaTrash, FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authProvider";

export default function Bookings() {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const token = localStorage.getItem("access-token");

  const { data: users = [] } = useQuery({
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

  const confirmOrder = async (item) => {
    try {
      const status = await apiRequest({
        url: `/confirm-order/${item._id}`,
        method: "PUT",
        token,
      });
      if (status?.success === true) {
        alert(`${item.transactionId} order is confimed`);
        refetch();
      }
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (item) => {
    try {
      const orders = await apiRequest({
        url: `/delete-order/${item._id}`,
        method: "DELETE",
        token: token,
      });
      if (orders.success === true) {
        refetch();
        alert(`${item.transactionId} account has been deleted`);
      }
    } catch (error) {
      return error;
    }
  };

  const indexOfLastName = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastName - itemsPerPage;

  const currentItems = orders.slice(indexOfFirstItem, indexOfLastName);

  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="mt-0 md:mt-0 lg:mt-14">
      <h1 className="text-center text-3xl font-bold text-green-400">Manage Bookings</h1>
      <div className="flex items-center  justify-around mt-4">
        <h4>All Users</h4>
        <h4>Total-Users :{orders?.length}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[800px] lg:w-[1200px]">
          {/* head */}
          <thead className=" rounded-lg text-green-600 uppercase">
            <tr className="text-md">
              <th>#</th>
              <th>Email</th>
              <th>transactionId</th>
              <th>price</th>
              <th>status</th>
              <th>confirm order</th>
              <th>Delete</th>
            </tr>
          </thead>
          {currentItems?.map((item, index) => (
            <tbody key={index} className="w-[200px]">
              <tr>
                <th>{index + 1}</th>
                <td>{item?.email}</td>
                <td className="sm:truncate">{item?.transactionId}</td>
                <td>{item?.price}</td>
                <td className="text-green-600">{item?.status}</td>

                <td className="pl-8">
                  {
                    item?.status === "order pending" ? (
                      <button>
                      <FaMarker
                        className=""
                        onClick={() => confirmOrder(item)}
                        color="red"
                        size={20}
                      />
                    </button> )
                    : (
                      <button>
                        <FaUser
                        color="green"
                        size={20}
                        />
                        </button>
                    )
                    
                  }
                 
                </td>

                <td>
                  <button>
                    <FaTrash
                      className=""
                      onClick={() => deleteUser(item)}
                      color="red"
                      size={20}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="justify-center flex items-center mt-4">
        {Array.from({ length: Math.ceil(orders?.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => pagination(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? "bg-green-400 text-white"
                  : "bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
