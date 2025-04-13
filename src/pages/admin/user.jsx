import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../api/apiRequest"
import { FaTrash, FaUser } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authProvider"

export default function User() {
    const {user} = useContext(AuthContext)
    const [currentPage,setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)
   
    
    const token = localStorage.getItem("access-token")
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const user = await apiRequest({
                url:`/get-user`,
                method:"GET",
                token:token
            })
             return user;
        }
    })

    
    const handleMakeAdmin = async (user)=>{
        try {
            const admin = await apiRequest({
                url:`/update-user/${user._id}`,
                method:"PUT",
                token
            })
            if(admin?.success === true){
                alert(`${user.name} is now an admin`)
                refetch()
            }
        } catch (error) {
            return error
        }
    }

    const deleteUser = async(user)=>{
        try {
            const userss = await apiRequest({
                url:`delete-user/${user._id}`,
                method:"DELETE",
                token:token
            })
            if(userss.success === true){
                refetch()
                alert(`${user.name} account has been deleted`)
            }
        } catch (error) {
            return error
        }
    }
    const indexOfLastName = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastName - itemsPerPage;
    const currentItems = users?.users?.slice(indexOfFirstItem, indexOfLastName);
    const pagination = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="mt- md:mt-0 lg:mt-20">
            <div className="flex items-center lg:justify-between gap-4 mx-4 text-xl  mt-4">
                <h4>All Users</h4>
                <h4 className="px-10">Total-Users :{users?.users?.length}</h4>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra md:w-[800px] lg:w-[1200px]">
                    {/* head */}
                    <thead className="bg-green-600 rounded-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>image</th>
                            <th>Email</th>
                            <th>role</th>
                            <th>action</th>

                        </tr>
                    </thead>
                    {
                        currentItems?.map((user, index) => (
                            <tbody key={index} className="w-[200px]">
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" } 
                                                        alt="" />
                                                </div>
                                            </div>
                                    </td>
                                    <td className="sm:truncate">{user.email}</td>
                                    <td>{
                                        user?.role === "admin" ? "Admin" 
                                        : <FaUser className="ml-2 cursor" color="green" size={20} onClick={()=> handleMakeAdmin(user)} />}</td>
                                    <td>
                                        <button>
                                            <FaTrash className="" 
                                            onClick={()=>deleteUser(user)}
                                             color="red" size={20} />
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        ))
                    }
                </table>
            </div>
            <div className="flex justify-center mt-6">
                {
                    Array.from({length:Math.ceil(users?.users?.length / itemsPerPage)}).map((_, index)=>(
                        <button key={index + 1} onClick={()=> pagination(index + 1)} 
                        className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green-400 text-white" : "bg-gray-400"}`}>
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}