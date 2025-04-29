import { createContext, useState, useRef } from "react";

const FiltersContext = createContext();

function FiltersProvider({ children }) {
    const setValueFnRef = useRef(null);
    const clearDrawLayerFnRef = useRef(null);
    const [geoShape, setGeoShape] = useState(null);

    const registerSetValueFn = (fn) => {
        setValueFnRef.current = fn;
    };

    const setValueFn = (name, value, options = {}) => {
        if (setValueFnRef.current) {
            setValueFnRef.current(name, value, options);
        } else {
            console.warn("setValueFn is not be registered");
        }
    };

    const registerClearDrawLayerFn = (fn) => {
        clearDrawLayerFnRef.current = fn;
    };

    const clearDrawLayerFn = () => {
        if (clearDrawLayerFnRef.current) {
            clearDrawLayerFnRef.current();
        } else {
            console.warn("clearDrawLayerFn is not be registered");
        }
    };

    const handleFilterSubmit = (filters) => {
        // filters: {geoShape, startYear, endYear, months, taxonGroups, recordTypes }
        console.log("搜尋條件：", filters);
    };

    const registerGeoShapeWatcher = (shape) => {
        setGeoShape(shape); // 直接更新最新 geoShape
    };

    const shareContent = {
        handleFilterSubmit,
        registerSetValueFn,
        setValueFn,
        registerClearDrawLayerFn,
        clearDrawLayerFn,
        registerGeoShapeWatcher,
        geoShape,
    };

    return (
        <FiltersContext.Provider value={shareContent}>
            {children}
        </FiltersContext.Provider>
    );
}

export { FiltersProvider };
export default FiltersContext;
