import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"


const useUsersState = () => {
    const { userData, users, totalPages, isLoading, error, token, isLoggedIn } = useSelector (
        (state: RootState) => state.userR
    )
    return { userData, users, totalPages, isLoading, error, token, isLoggedIn }
}

export default useUsersState