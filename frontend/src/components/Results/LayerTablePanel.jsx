import React from "react";
import PaginatedTablePanel from "./PaginatedTablePanel";

const tableColumns = [
    { title: "圖層名稱", dataIndex: "LayerName", width: "50%" },
    { title: "圖層管理單位", dataIndex: "ManagementUnit" },
    {
        title: "佔所查詢空間範圍內之面積比例",
        dataIndex: "areaPropotion",
        width: "20%",
    },
];

const LayerTablePanel = ({ rows }) => {
    return (
        <div className="ly-table">
            <PaginatedTablePanel
                rows={rows}
                columns={tableColumns}
                showDownloadBtn={false}
                panelType="layerTable"
            />
        </div>
    );
};

export default LayerTablePanel;
