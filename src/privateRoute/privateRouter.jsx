import { useContext } from "react"
import { AuthContext } from "../context/authProvider"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/loading"



export default function PrivateRouter({children}){
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    if(loading){
        return (
            <LoadingSpinner />
        )
    }
    if(user){
        return children;
    }
    return(
      <Navigate to='/login' state={{from :location}} replace>

      </Navigate>
    )
}