import React from "react";
import * as d3 from "d3";
import CustomTable from "./CustomTable";

const DataMapPanel = ({ rows }) => {
    // 過濾掉 value 為 0 的資料
    const filteredData = rows.filter((d) => d.value > 0);

    let logScale;

    if (filteredData.length === 1) {
        // 只有一筆資料，手動定義為固定比例尺
        logScale = () => 100;
    } else {
        logScale = d3
            .scaleLog()
            .domain([
                d3.min(filteredData, (d) => d.value),
                d3.max(filteredData, (d) => d.value),
            ])
            .range([0, 100]);
    }

    const columns = [
        { title: "物種類群", dataIndex: "name", width: "20%" },
        { title: "資料筆數", dataIndex: "value", width: "20%" },
        {
            title: "資料筆數佔比（經對數轉換）",
            dataIndex: "value",
            width: "60%",
            render: (value, row) => (
                <div
                    style={{
                        height: "12px",
                        width: "100%",
                        position: "relative",
                        borderRadius: "4px",
                    }}
                >
                    <div
                        style={{
                            background: row.color,
                            height: "100%",
                            width: `${logScale(value)}%`,
                            borderRadius: "4px",
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="wbox">
            <div className="sq-item">
                <CustomTable columns={columns} rows={filteredData} />
            </div>
        </div>
    );
};

export default DataMapPanel;
