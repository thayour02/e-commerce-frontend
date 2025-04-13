import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { apiRequest } from "../api/apiRequest";
import { useContext } from "react";


const useHook = ()=>{
    const {user} = useContext(AuthContext)
    const {data : menu =[], refetch}=useQuery({
        queryKey:['user'],
        queryFn:async ()=>{
            const you = await apiRequest({
                url:'/get',
                method:"GET"
            })
            return you
        }
    })



    return [ user ];
}

export default useHook