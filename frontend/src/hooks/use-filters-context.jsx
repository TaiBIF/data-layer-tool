import { useContext } from "react";
import FiltersContext from "../context/filters";

function useFiltersContext() {
    return useContext(FiltersContext);
}

export default useFiltersContext;
