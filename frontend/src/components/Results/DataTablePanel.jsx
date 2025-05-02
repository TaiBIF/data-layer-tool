import React from "react";
import PaginatedTablePanel from "./PaginatedTablePanel";

const tableColumns = [
    { title: "學名", dataIndex: "scientificName", width: "30%" },
    { title: "中文名", dataIndex: "chineseName", width: "20%" },
    { title: "保育等級", dataIndex: "conservationLevel" },
    { title: "紅皮書等級", dataIndex: "redListLevel" },
    { title: "資料筆數", dataIndex: "dataCount" },
];

const DataTablePanel = ({ rows }) => {
    return (
        <PaginatedTablePanel
            rows={rows}
            columns={tableColumns}
            showDownloadBtn={true}
            panelType="dataTable"
        />
    );
};

export default DataTablePanel;
