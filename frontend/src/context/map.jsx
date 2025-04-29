import { createContext, useState, useRef } from "react";

const MapContext = createContext();

function MapProvider({ children }) {
    const [isDrawMode, setIsDrawMode] = useState(false);
    const drawCircleFnRef = useRef(null);

    const toggleDrawMode = () => {
        setIsDrawMode((prev) => !prev);
    };

    const handleCircleSelectionSubmit = (selection) => {
        console.log("圈選資料：", selection);
    };

    const registerDrawCircleFn = (fn) => {
        drawCircleFnRef.current = fn;
    };

    const drawCircleFn = (lat, lng, radius) => {
        if (drawCircleFnRef.current) {
            drawCircleFnRef.current(lat, lng, radius);
        }
    };

    const shareContent = {
        isDrawMode,
        setIsDrawMode,
        toggleDrawMode,
        handleCircleSelectionSubmit,
        registerDrawCircleFn,
        drawCircleFn,
    };

    return (
        <MapContext.Provider value={shareContent}>
            {children}
        </MapContext.Provider>
    );
}

export { MapProvider };
export default MapContext;
