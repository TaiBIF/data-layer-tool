import React from "react";
import MapPanel from "./Map/MapPanel";
import FilterPanel from "./FilterPanel";

const FilterSection = () => {
    return (
        <section className="s1-filter-area">
            <MapPanel />
            <FilterPanel />
        </section>
    );
};

export default FilterSection;
