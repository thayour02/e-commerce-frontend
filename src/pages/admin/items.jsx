import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { apiRequest } from "../../api/apiRequest"
import { FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import useCart from "../../hooks"

export default function ManageItems() {

    const { refetch, data: menu = [] } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const menuItem = await apiRequest({
                url: `/menus`,
                method: "GET"
            })
            return menuItem
        }
    })

    const handleDelete = async (item) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure You want to delete this item?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                const delet = await apiRequest({
                    url: `/delete-item/${item._id}`,
                    method: "DELETE"
                })
                if (delet?.success === true) {
                    Swal.fire({
                        title: "Delete",
                        text: "Items deleted successfully",
                        icon: "success"
                    });
                    refetch()
                }
            }

        } catch (error) {
            return error
        }
    }

    return (
        <div className="max-w-screen-2xl xl-px-20 px-4 mt-20 md:mt-0">
            <h2 className="text-2xl font-semibold text-green-400 my-4 text-center">Manage Menu Items</h2>


            <div>
                <div className="overflow-x-auto md:w-[870px]">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                menu?.menus?.map((item, index) => (
                                    <tr key={index}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt={item.image} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>${item.price}</td>

                                        <td className="ml-4">
                                            <Link to={`/dashboard/update-menu/${item._id}`}>
                                                <button>
                                                    < FaEdit size={15} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(item)}>
                                                <FaTrash size={15} />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }



                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}