import React from "react";
import CustomSelect from "../CustomSelect";

const displayOptions = [
    { value: "10", label: "10" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
];

const labelMap = {
    dataTable: "物種數",
    layerTable: "圖層數",
};

const TableBar = ({
    totalPages,
    totalNumbers,
    showDownloadBtn,
    pageSize,
    onPageSizeChange,
    panelType,
}) => {
    const handlePageSizeChange = (selectedOption) => {
        const value = parseInt(selectedOption.value, 10);
        onPageSizeChange(value);
    };

    return (
        <div className="top-item-flex">
            <div className="page-inf">
                <div style={{ flexShrink: 0, marginRight: 2 }}>每頁顯示 </div>
                <CustomSelect
                    placeholder=""
                    options={displayOptions}
                    defaultValue={displayOptions.find(
                        (opt) => parseInt(opt.value, 10) === pageSize
                    )}
                    onChange={handlePageSizeChange}
                />
                <div style={{ flexShrink: 0, marginLeft: 2 }}>
                    {" "}
                    筆，共 <span>{totalPages}</span> 頁
                </div>
            </div>

            <div className="right-box" style={{ marginTop: 0 }}>
                <p>
                    {labelMap[panelType] ?? "數量"}：{totalNumbers}
                </p>
                {showDownloadBtn ? (
                    <div className="link-area">
                        <a href="#">物種清單下載</a>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default TableBar;
