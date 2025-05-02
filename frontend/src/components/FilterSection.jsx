import React from "react";
import MapPanel from "./Map/MapPanel";
import FilterPanel from "./FilterPanel";

const FilterSection = ({ onSearch }) => {
    return (
        <section className="s1-filter-area">
            <MapPanel />
            <FilterPanel onSearch={onSearch} />
        </section>
    );
};

export default FilterSection;
