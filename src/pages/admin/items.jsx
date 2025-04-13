import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { apiRequest } from "../../api/apiRequest";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks";

export default function ManageItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { refetch, data: menu = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const menuItem = await apiRequest({
        url: `/menus`,
        method: "GET",
      });
      return menuItem;
    },
  });

  const handleDelete = async (item) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure You want to delete this item?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const delet = await apiRequest({
          url: `/delete-item/${item._id}`,
          method: "DELETE",
        });
        if (delet?.success === true) {
          Swal.fire({
            title: "Delete",
            text: "Items deleted successfully",
            icon: "success",
          });
          refetch();
        }
      }
    } catch (error) {
      return error;
    }
  };

  const indexOfLastName = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastName - itemsPerPage;

  const currentItems = menu?.menus?.slice(indexOfFirstItem, indexOfLastName);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-2xl xl-px-20 px-4 mt-10 md:mt-0 lg:mt-20">
      <h2 className="text-2xl font-semibold text-green-400 my-4 text-center">
        Manage Menu Items
      </h2>
      <div>
        <div className="overflow-x-auto md:w-[750px] lg:w-[1200px]">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.image} />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>

                  <td className="ml-4">
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button>
                        <FaEdit size={15} />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item)}>
                      <FaTrash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        {Array.from({
          length: Math.ceil(menu?.menus?.length / itemsPerPage),
        }).map((_, index) => (
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
        ))}
      </div>
    </div>
  );
}
