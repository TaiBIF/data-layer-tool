import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useMapContext from "../../hooks/use-map-context";
import useDialogsContext from "../../hooks/use-dialogs-context";
import useFiltersContext from "../../hooks/use-filters-context";

const PolygonSelector = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            polyBox: null,
        },
    });
    const { closeDialog } = useDialogsContext();
    const { setValueFn } = useFiltersContext();
    const [errorMessage, setErrorMessage] = useState(null);

    const CustomOnSubmit = (formData) => {
        try {
            const parsed = JSON.parse(formData.polyBox);
            parsed.properties.isUserUploaded = true;
            setValueFn("geoShape", parsed);
            closeDialog("polygon"); // 關閉彈出視窗
        } catch (error) {
            setErrorMessage(
                "上傳失敗！請檢查 GeoJSON 格式是否正確或檔案是否超過大小上限"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(CustomOnSubmit)}>
            <div className="pop-title">上傳Polygon</div>
            <p>請以 GeoJSON 格式貼上欲查詢的 Polygon：</p>
            <textarea
                className="polybox"
                name=""
                id=""
                cols="30"
                rows="10"
                {...register("polyBox", { required: true })}
            ></textarea>
            {errorMessage && (
                <div
                    style={{ color: "red", marginTop: "8px", fontSize: "14px" }}
                >
                    {errorMessage}
                </div>
            )}
            <div className="short-right">
                *上限2.5 MB
                <br />
                <span>可使用 mapshaper 進行KML、shapefile等格式轉換</span>
            </div>
            <button className="send-btn" type="submit">
                確認
            </button>
        </form>
    );
};

export default PolygonSelector;
