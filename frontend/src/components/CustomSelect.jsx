import React from "react";
import Select, { components } from "react-select";

const CustomMultiValueRemove = (props) => (
    <components.MultiValueRemove {...props}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>×</span>
    </components.MultiValueRemove>
);

const customStyles = {
    container: (base) => ({
        ...base,
        width: "100%",
    }),
    control: (base) => ({
        ...base,
        cursor: "pointer",
        borderRadius: "10px",
        width: "100%",
        border: "1px solid #EEEEEE",
        paddingLeft: "15px",
        paddingRight: "35px",
        backgroundColor: "#FFF",
        fontSize: "16px",
        backgroundImage: 'url("/images/selectar.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 15px center",
        backgroundSize: "12px auto",
        appearance: "none",
        boxShadow: "none",
        minHeight: "38px",
    }),
    valueContainer: (base) => ({
        ...base,
        padding: "2px 0",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    }),
    multiValue: (base) => ({
        ...base,
        color: "#fff",
        backgroundColor: "rgb(58, 132, 88)", // 深綠背景
        borderRadius: "20px",
        padding: "8px 30px 8px 6px",
        fontSize: "14px",
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "5px",
        border: "0px",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block",
        position: "relative",
        verticalAlign: "bottom",
        boxSizing: "border-box",
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "white",
        fontSize: "16px",
        padding: 0,
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "#fff",
        position: "absolute",
        right: "5px",
        top: "50%",
        transform: "translateY(-45%)",
        ":hover": {
            color: "#ccc",
            backgroundColor: "transparent",
        },
    }),
    dropdownIndicator: () => ({
        display: "none",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    input: (base) => ({
        ...base,
        fontSize: "16px",
        margin: 0,
        padding: 0,
    }),
    singleValue: (base) => ({
        ...base,
        fontSize: "16px",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "14px",
        color: "#999",
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
    }),
};

const CustomSelect = ({
    options,
    placeholder = "請選擇",
    isMulti = false,
    defaultValue,
    ...props
}) => {
    return (
        <Select
            menuPortalTarget={document.body}
            components={{ MultiValueRemove: CustomMultiValueRemove }}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            styles={customStyles}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default CustomSelect;
