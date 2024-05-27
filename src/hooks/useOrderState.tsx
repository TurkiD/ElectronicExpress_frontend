import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"


const useOrderState = () => {
    const { OrderData, isLoading, error, totalPages } = useSelector(
        (state: RootState) => state.orderR
      )
    return { OrderData, isLoading, error, totalPages }
}

export default useOrderState