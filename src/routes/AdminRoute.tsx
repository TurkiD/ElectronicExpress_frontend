import useUsersState from "@/hooks/useUsersState"
import { LoginPage } from "@/pages"

import { Outlet } from "react-router-dom"


const AdminRoute = () => {
    const { isLoggedIn, userData } = useUsersState()
    return isLoggedIn && userData?.isAdmin ? <Outlet /> : <LoginPage />
}

export default AdminRoute