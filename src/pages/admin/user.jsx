import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../api/apiRequest"
import { FaTrash, FaUser } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authProvider"

export default function User() {
    const {user} = useContext(AuthContext)
   
    
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
            })
            if(admin?.success === true){
                alert(`${user.name} is now an admin`)
                refetch
            }else{

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
                // if(userss === user?.token){
                // window.location.replace("/login")
                // }
            }
        } catch (error) {
            return error
        }
    }
    return (
        <div className="mt-40 md:mt-0">
            <div className="flex items-center justify-between mt-4">
                <h4>All Users</h4>
                <h4>Total-Users :{users?.users?.length}</h4>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra md:w-[880px]">
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
                        users?.users?.map((user, index) => (
                            <tbody key={index} className="w-[200px]">
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
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
        </div>
    )
}