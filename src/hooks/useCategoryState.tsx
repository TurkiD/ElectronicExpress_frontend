import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"


const useCategoryState = () => {
    const { categoryData, isLoading, error, totalPages } = useSelector(
        (state: RootState) => state.categoryR
      )
    return { categoryData, isLoading, error, totalPages }
}

export default useCategoryState