import React, { useState } from "react";
import clsx from "clsx";

const CustomToggleButton = ({
    children,
    className,
    isActive = false, // 狀態從父層傳入
    onToggle,
    ...props
}) => {
    const handleClick = (event) => {
        onToggle?.(event); // 交由父層處理 toggle
    };

    return (
        <li
            className={clsx(className, { now: isActive })}
            onClick={handleClick}
            {...props}
        >
            {children}
        </li>
    );
};

export default CustomToggleButton;
