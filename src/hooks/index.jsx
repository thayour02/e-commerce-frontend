import { useContext } from "react"
import { AuthContext } from "../context/authProvider"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../api/apiRequest"

const useCart = () => {
    const { user } = useContext(AuthContext)
    const token = localStorage.getItem("access-token")

    const { refetch, data: cart  } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
           
            const response = await  apiRequest({
                url:   `http://localhost:3000/api/carts?email=${user?.email}`,
                token
            })
            return response?.data
        },
        
    })

    return [cart, refetch]
}




export default useCart
