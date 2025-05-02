import React from "react";

const CustomTable = ({ columns, rows }) => {
    const renderedTableColumns = columns.map((col, index) => (
        <td key={index} width={col.width || undefined}>
            {col.title}
        </td>
    ));

    const renderedTableRows = rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
                <td key={colIndex}>
                    {col.render
                        ? col.render(row[col.dataIndex], row)
                        : row[col.dataIndex]}
                </td>
            ))}
        </tr>
    ));

    return (
        <div className="mb-scroll">
            <table
                className="table-style1"
                cellPadding="0"
                cellSpacing="0"
                border="0"
            >
                <thead>
                    <tr>{renderedTableColumns}</tr>
                </thead>
                <tbody>{renderedTableRows}</tbody>
            </table>
        </div>
    );
};

export default CustomTable;
