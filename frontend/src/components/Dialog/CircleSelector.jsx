import React from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import useMapContext from "../../hooks/use-map-context";
import useDialogsContext from "../../hooks/use-dialogs-context";

const radiusOptions = [
    { value: "1000", label: "1 KM" },
    { value: "2000", label: "2 KM" },
    { value: "5000", label: "5 KM" },
];
const CircleSelector = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            radius: null,
            longitude: null,
            latitude: null,
        },
    });
    const { handleCircleSelectionSubmit, drawCircleFn } = useMapContext();
    const { closeDialog } = useDialogsContext();

    const CustomOnSubmit = (selection) => {
        drawCircleFn(
            parseFloat(selection.latitude),
            parseFloat(selection.longitude),
            parseFloat(selection.radius?.value)
        );

        handleCircleSelectionSubmit(selection);
        closeDialog("circle"); // 關閉彈出視窗
    };

    return (
        <form onSubmit={handleSubmit(CustomOnSubmit)}>
            <div className="pop-title">圓中心框選</div>
            <div
                className="short-right"
                style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#555",
                }}
            >
                僅支援十進位經緯度，例如：經度 121.6141 緯度 25.0451
            </div>
            <div className="input-flex">
                <p>半徑</p>
                <Controller
                    name="radius"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CustomSelect
                            placeholder="請選擇範圍半徑"
                            options={radiusOptions}
                            {...field}
                        />
                    )}
                />
            </div>

            <div className="input-flex">
                <p>中心點經度</p>
                <input
                    type="text"
                    {...register("longitude", {
                        required: "請輸入經度",
                        validate: (value) => {
                            const num = parseFloat(value);
                            if (isNaN(num)) return "經度必須是數字";
                            if (num < -180 || num > 180)
                                return "經度必須在 -180 ~ 180 之間";
                            return true;
                        },
                    })}
                />
            </div>
            {errors.longitude && (
                <div
                    style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {errors.longitude.message}
                </div>
            )}

            <div className="input-flex">
                <p>中心點緯度</p>
                <input
                    type="text"
                    {...register("latitude", {
                        required: "請輸入緯度",
                        validate: (value) => {
                            const num = parseFloat(value);
                            if (isNaN(num)) return "緯度必須是數字";
                            if (num < -90 || num > 90)
                                return "緯度必須在 -90 ~ 90 之間";
                            return true;
                        },
                    })}
                />
            </div>
            {errors.latitude && (
                <div
                    style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {errors.latitude.message}
                </div>
            )}

            <button className="send-btn" type="submit">
                確認
            </button>
        </form>
    );
};

export default CircleSelector;
