import { Outlet } from "react-router-dom"

import { LoginPage } from "@/pages/Login/LoginPage"
import useUsersState from "@/hooks/useUsersState"

const ProtectedRoute = () => {
  const { isLoggedIn } = useUsersState()
  return isLoggedIn ? <Outlet /> : <LoginPage />
}

export default ProtectedRoute
