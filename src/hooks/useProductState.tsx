import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"


const useProductState = () => {
    const { productData, isLoading, error, totalPages } = useSelector(
        (state: RootState) => state.productR
      )
    return { productData, isLoading, error, totalPages }
}

export default useProductState