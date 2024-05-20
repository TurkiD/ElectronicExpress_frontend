import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"


const useUsersState = () => {
    const { userData, isLoading, error, token, isLoggedIn } = useSelector (
        (state: RootState) => state.userR
    )
    return { userData, isLoading, error, token, isLoggedIn }
}

export default useUsersState