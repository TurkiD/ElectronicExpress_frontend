import { Outlet } from "react-router-dom";

import { Login } from "@/pages/Login/Login";
import useUsersState from "@/hooks/useUsersState";



const ProtecedRoute = () => {
    const { isLoggedIn } = useUsersState()
    return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtecedRoute