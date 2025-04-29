import { useContext } from "react";
import MapContext from "../context/map";

function useMapContext() {
    return useContext(MapContext);
}

export default useMapContext;
