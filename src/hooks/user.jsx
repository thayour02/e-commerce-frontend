import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { apiRequest } from "../api/apiRequest";
import { useContext } from "react";


const useHook = ()=>{
    const {user} = useContext(AuthContext)
    const {data : menu =[], refetch}=useQuery({
        queryKey:['menu'],
        queryFn:async ()=>{
            const data = await apiRequest({
                url:'/get',
                method:"GET"
            })
            console.log(data)
        }
    })



    return (
        <div>menu</div>
    )
}

export default useHook