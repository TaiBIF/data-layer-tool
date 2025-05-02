import "./styles/base/_animation.scss";
import "./styles/base/_mixin.scss";
import "./styles/base/_reset.scss";
import "./styles/pages/_index.scss";
import "./styles/pages/_main.scss";

import { useState } from "react";
import Header from "./components/Header";
import BackgroundAnimation from "./components/BackgroundAnimation";
import DialogPanel from "./components/Dialog/DialogPanel";
import FilterSection from "./components/FilterSection";
import ResultSection from "./components/ResultSection";

import {
    fakeTableRows,
    fakeLayerTableRows,
    fakeTableMapData,
} from "./data/tableRows";

function App() {
    const [speciesTableData, setSpeciesTableData] = useState([]);
    const [layerTableData, setLayerTableData] = useState([]);
    const [tableMapData, setTableMapData] = useState([]);

    const getRandomRows = (data, maxCount = 70) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * maxCount) + 1; // 至少1筆
        return shuffled.slice(0, count);
    };

    const handleSearch = (formFilters) => {
        const speciesData = getRandomRows(fakeTableRows, 70); // TODO:之後用 API 取代
        const layerData = getRandomRows(fakeLayerTableRows, 30);

        const selectedTaxonValues =
            formFilters?.taxonGroups?.map((taxon) => taxon.label) ?? [];

        const filteredTableMapData =
            selectedTaxonValues.length === 0
                ? fakeTableMapData // 全選：不過濾
                : fakeTableMapData.filter((data) =>
                      selectedTaxonValues.includes(data.name)
                  );

        setSpeciesTableData(speciesData);
        setLayerTableData(layerData);
        setTableMapData(filteredTableMapData);
    };

    return (
        <>
            <BackgroundAnimation />
            <DialogPanel />
            <Header />
            <FilterSection onSearch={handleSearch} />
            <ResultSection
                speciesTableData={speciesTableData}
                layerTableData={layerTableData}
                tableMapData={tableMapData}
            />
        </>
    );
}

export default App;
