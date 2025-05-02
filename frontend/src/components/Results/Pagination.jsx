import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (targetPage) => {
        if (
            targetPage >= 1 &&
            targetPage <= totalPages &&
            targetPage !== currentPage
        ) {
            onPageChange(targetPage);
        }
    };

    const createPaginationItems = () => {
        const items = [];

        items.push({
            label: 1,
            disabled: currentPage === 1,
        });

        // Prev button
        items.push({
            isPrev: true,
            disabled: currentPage === 1,
        });

        if (totalPages <= 3) {
            // 頁數少於等於3，全部列出來
            if (currentPage - 1 >= 1) {
                items.push({
                    label: currentPage - 1,
                    isActive: false,
                });
            }

            // 自己
            items.push({
                label: currentPage,
                isActive: true,
            });

            if (currentPage + 1 <= totalPages) {
                items.push({
                    label: currentPage + 1,
                    isActive: false,
                });
            }
        } else {
            // totalPages > 3 的正常情況

            // Middle pages (currentPage左右)
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i >= 1 && i <= totalPages) {
                    items.push({
                        label: i,
                        isActive: i === currentPage,
                    });
                }
            }
        }

        // Next button
        items.push({
            isNext: true,
            disabled: currentPage === totalPages,
        });

        items.push({
            label: totalPages,
            disabled: currentPage === totalPages,
        });

        return items;
    };

    const paginationItems = createPaginationItems();

    const renderedPaginationButton = paginationItems.map((item, index) => {
        if (item.isPrev || item.isNext) {
            const targetPage = item.isPrev ? currentPage - 1 : currentPage + 1;

            return (
                <a
                    href="#"
                    className={item.isPrev ? "prev" : "next"}
                    key={index}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(targetPage);
                    }}
                    style={{
                        pointerEvents: item.disabled ? "none" : "auto",
                        opacity: item.disabled ? 0.5 : 1,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="7.86"
                        height="15.491"
                        viewBox="0 0 7.86 15.491"
                        style={{
                            transform: item.isPrev ? "none" : "rotate(180deg)",
                        }}
                    >
                        <path
                            d="M6.555.246.216,7.219a.747.747,0,0,0-.2.4v0l0,.01v.014A.75.75,0,0,0,0,7.728v0c0,.005,0,.011,0,.016s0,.011,0,.016H0a.752.752,0,0,0,.025.177h0l0,.014v0l0,.011,0,.007,0,.007,0,.011V8l.005.014h0a.745.745,0,0,0,.148.24l6.358,6.994a.75.75,0,0,0,1.111-1.009l-5.9-6.491 5.9-6.491A.75.75,0,0,0,6.555.246Z"
                            fill="#257455"
                        />
                    </svg>
                </a>
            );
        }

        return (
            <a
                href="#"
                className={item.isActive ? "now" : ""}
                key={index}
                onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(item.label);
                }}
                style={{
                    pointerEvents: item.disabled ? "none" : "auto",
                    opacity: item.disabled ? 0.5 : 1,
                }}
            >
                {item.label}
            </a>
        );
    });

    return <div className="page-number">{renderedPaginationButton}</div>;
};

export default Pagination;
