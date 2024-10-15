import { DetailsContext } from "../context/DetailContext";
import { useContext} from "react";

export const useDetailsContext = () => {
    const context = useContext(DetailsContext)

    if (!context) {
        throw Error("useDetailsContext must be used within a DetailsContextProvider")
    }

    return context
}