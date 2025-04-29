import React from "react";
import CircleSelector from "./CircleSelector";
import PolygonSelector from "./PolygonSelector";
import useDialogsContext from "../../hooks/use-dialogs-context";
import { polygon } from "leaflet";

const DialogPanel = () => {
    const { dialog, closeDialog } = useDialogsContext();
    const activeDialog = dialog.activeDialog;
    const dialogMap = {
        circle: <CircleSelector />,
        polygon: <PolygonSelector />,
    };
    const renderedDialog = dialogMap[activeDialog] || <></>;
    if (!activeDialog) {
        return null;
    }
    return (
        <div className="pop-area" id="cir-box">
            <div className="rel">
                <div className="center-box">
                    <div
                        className="xx"
                        onClick={() => closeDialog(activeDialog)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path
                                id="Union_3"
                                data-name="Union 3"
                                d="M580.293,307.707,572,299.414l-8.293,8.293a1,1,0,0,1-1.414-1.415L570.586,298l-8.293-8.293a1,1,0,0,1,1.414-1.415L572,296.586l8.293-8.293a1,1,0,0,1,1.414,1.415L573.414,298l8.293,8.293a1,1,0,0,1-1.414,1.415Z"
                                transform="translate(-562 -288)"
                                fill="#fff"
                            />
                        </svg>
                    </div>
                    {renderedDialog}
                </div>
            </div>
        </div>
    );
};

export default DialogPanel;
