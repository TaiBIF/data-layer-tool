import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import CustomToggleButton from "./CustomToggleButton";
import useFiltersContext from "../hooks/use-filters-context";
import useMapContext from "../hooks/use-map-context";
import useDialogsContext from "../hooks/use-dialogs-context";
import {
    yearOptions,
    taxonGroupOptions,
    basisOfRecordOptions,
    monthOptions,
} from "../data/options";

const FilterPanel = ({ onSearch }) => {
    const {
        handleFilterSubmit,
        registerSetValueFn,
        clearDrawLayerFn,
        registerGeoShapeWatcher,
    } = useFiltersContext();
    const { toggleDrawMode, isDrawMode, setIsDrawMode } = useMapContext();
    const { openDialog } = useDialogsContext();
    const { control, handleSubmit, reset, watch, getValues, setValue } =
        useForm({
            defaultValues: {
                geoShape: null,
                startYear: null,
                endYear: null,
                months: [],
                taxonGroups: [],
                recordTypes: [],
            },
        });

    const selectedMonths = watch("months");

    const toggleMonth = (value) => {
        const current = getValues("months") || [];
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

        setValue("months", next, { shouldDirty: true });
    };

    const renderedMonthOptions = monthOptions.map((month) => (
        <CustomToggleButton
            key={month.value}
            isActive={selectedMonths.includes(month.value)} // 由父層控制狀態
            onToggle={() => toggleMonth(month.value)} // 由父層更新狀態
        >
            {month.label}
        </CustomToggleButton>
    ));

    const handleFormClear = () => {
        reset();
        if (clearDrawLayerFn) {
            clearDrawLayerFn();
        }
    };

    const geoShape = watch("geoShape");

    useEffect(() => {
        registerSetValueFn(setValue);
        registerGeoShapeWatcher(geoShape); // 每次 geoShape 有變動就註冊進 context
    }, [geoShape, registerSetValueFn, registerGeoShapeWatcher]);

    const combinedHandleSubmit = (formFilters) => {
        handleFilterSubmit(formFilters);
        onSearch(formFilters);
    };

    return (
        <form
            className="filter-area"
            onSubmit={handleSubmit(combinedHandleSubmit)}
        >
            <div className="ali-sp">
                <div className="top-btn-area">
                    <ul>
                        <li onClick={toggleDrawMode}>
                            {isDrawMode ? "關閉地圖框選" : "開啟地圖框選"}
                        </li>
                        <li
                            id="cir-select"
                            onClick={() => {
                                openDialog("circle");
                                setIsDrawMode(true);
                            }}
                        >
                            圓中心框選
                        </li>
                        <li
                            id="up-polygon"
                            onClick={() => {
                                openDialog("polygon");
                                setIsDrawMode(true);
                            }}
                        >
                            上傳Polygon
                        </li>
                    </ul>
                </div>

                <div className="filter-main">
                    <div className="item-set">
                        <h2>年份區間</h2>
                        <div className="flex-date">
                            <Controller
                                name="startYear"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        placeholder="請選擇起始年份"
                                        options={yearOptions}
                                        {...field}
                                    />
                                )}
                            />
                            <span className="mark">~</span>
                            <Controller
                                name="endYear"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        placeholder="請選擇結束年份"
                                        options={yearOptions}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="item-set marb_10">
                        <h2>月份</h2>
                        <ul className="month-select">{renderedMonthOptions}</ul>
                    </div>

                    <div className="item-set">
                        <h2>物種類群</h2>
                        <div className="multiple-select">
                            <Controller
                                name="taxonGroups"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        isMulti
                                        placeholder="請選擇類群"
                                        options={taxonGroupOptions}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="item-set">
                        <h2>記錄類型</h2>
                        <div className="multiple-select">
                            <Controller
                                name="recordTypes"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        isMulti
                                        placeholder="請選擇記錄類型"
                                        options={basisOfRecordOptions}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-area">
                <button
                    type="button"
                    className="clean-btn"
                    onClick={handleFormClear}
                >
                    清除搜尋條件
                </button>
                <button type="submit" className="search-btn">
                    搜尋
                </button>
            </div>
        </form>
    );
};

export default FilterPanel;
