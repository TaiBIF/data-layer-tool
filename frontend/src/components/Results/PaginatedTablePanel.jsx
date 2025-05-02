import React, { useState, useEffect } from "react";
import TableBar from "./TableBar";
import CustomTable from "./CustomTable";
import Pagination from "./Pagination";

const PaginatedTablePanel = ({ rows, columns, showDownloadBtn, panelType }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setCurrentPage(1); // 換資料或頁大小時回第一頁
    }, [rows, pageSize]);

    const onPageSizeChange = (size) => {
        setPageSize(size);
    };

    const totalNumbers = rows.length;
    const totalPages = Math.ceil(totalNumbers / pageSize);

    const currentPageRows = rows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="wbox">
            <TableBar
                totalPages={totalPages}
                totalNumbers={totalNumbers}
                showDownloadBtn={showDownloadBtn}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
                panelType={panelType}
            />
            <CustomTable
                columns={columns}
                rows={currentPageRows}
                onPageChange={setCurrentPage}
            />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default PaginatedTablePanel;
