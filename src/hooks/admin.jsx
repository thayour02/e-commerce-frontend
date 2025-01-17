import { useContext } from "react"
import { AuthContext } from "../context/authProvider"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../api/apiRequest"

const useAdmin = ()=> {
    const {user} = useContext(AuthContext)
    const token = localStorage.getItem("access-token")
    const {refetch, data: isAdmin, isPending:isAdminLoading}= useQuery({
        queryKey:[user?.email, 'isAdmin}'],
        queryFn: async () => {
            const res = await apiRequest({
                url:`/get-admin?email=${user?.email}`,
                method:'GET',
                token:token
            })
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminLoading]
}

export default useAdmin