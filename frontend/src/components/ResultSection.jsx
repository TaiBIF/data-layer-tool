import React from "react";
import DataTablePanel from "./Results/DataTablePanel";
import LayerTablePanel from "./Results/LayerTablePanel";
import DataMapPanel from "./Results/DataTreeMapPanel";

import useFiltersContext from "../hooks/use-filters-context";

const ResultSection = ({ speciesTableData, layerTableData, tableMapData }) => {
    const { showResultSection, resultSectionRef } = useFiltersContext();
    return (
        <section
            className="s2-result"
            ref={resultSectionRef}
            style={{ display: showResultSection ? "block" : "none" }}
        >
            <div className="title-box">
                <h2>Search Results</h2>
                <div className="line"></div>
            </div>
            <div className="flex-wbox2">
                <DataTablePanel rows={speciesTableData} />
                <DataMapPanel rows={tableMapData} />
            </div>
            <LayerTablePanel rows={layerTableData} />
        </section>
    );
};

export default ResultSection;
